import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Back_Arrow } from "@assets/images/indexes";
import Colors from "../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

interface HeaderProps {
  text?: string;
  onPressBack?: () => void;
  onPressRight?: () => void;
  rightLabel?: string;
  textStyle?: TextStyle;
}

const AirKeyHeader: React.FC<HeaderProps> = React.memo(
  ({ onPressBack, text, onPressRight, rightLabel, textStyle }) => {
    return (
      <View style={styles.container}>
        {onPressBack && (
          <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
            <Back_Arrow />
          </TouchableOpacity>
        )}
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        {onPressRight && (
          <TouchableOpacity onPress={onPressRight} style={styles.rightView}>
            <Text style={styles.text}>{rightLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },
  text: {
    fontSize: 19,
    color: Colors.black,
    textAlign: "center",
    flex: 1,
    marginRight: "8%",
    fontFamily: fonts.urbanistSemiBold,
  },
  rightView: {
    width: 50,
    alignItems: "flex-end",
  },
});

export default AirKeyHeader;
