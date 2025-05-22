import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Colors from "../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

interface CustomTextProps {
  text?: string;
  titleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  displayLoading?: boolean;
  loadingIndicatorSize?: number;
  startTrip?: boolean;
  disable?: boolean;
  onPressOut?: () => void;
}

export const AirKeyButton: React.FC<CustomTextProps> = (props) => {
  const {
    text,
    titleStyle,
    onPress,
    displayLoading = false,
    loadingIndicatorSize = 30,
    buttonStyle,
    disable,
    onPressOut,
  } = props;

  const handlePress = () => {
    onPressOut && onPressOut();
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7} 
      disabled={disable}
      style={[styles.buttonContainer, buttonStyle]}
      onPressOut={handlePress}
    >
      {displayLoading ? (
        <ActivityIndicator size={loadingIndicatorSize} color={Colors.white} />
      ) : (
        <Text style={[styles.buttonText, titleStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    letterSpacing: 0.7,
    fontFamily: fonts.urbanistSemiBold,
  },
  buttonContainer: {
    backgroundColor: Colors.primary_color,
    borderRadius: 28.5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 53,
  },
});
