import React, { useState } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput as ReactTextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

type CountryCodeInputProps = {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  keyBoardOptions?: KeyboardTypeOptions;
  onchange?: (e: string) => void;
  error?: string;
  viewStyle?: StyleProp<ViewStyle>;
  leftText?: string;
  onPress?: () => void;
  isEditable?: boolean;
  countryCodeText?: StyleProp<TextStyle>;
  label?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const CountryCodeInput: React.FC<CountryCodeInputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const customStyleTextInput = () => {
    if (!props.leftIcon || !props.rightIcon) {
      return {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
      };
    }
  };

  return (
    <View style={[styles.outerContainer, props.contentContainerStyle]}>
      {props.label && (props.value || isFocused) && (
        <Text style={styles.label}>{props.label}</Text>
      )}
      <View style={[styles.container, props.containerStyle]}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <Text style={[styles.leftText, props.countryCodeText]}>
            {props.leftText}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <ReactTextInput
          editable={props.isEditable}
          keyboardType={props.keyBoardOptions}
          placeholder={!props.value && !isFocused ? props.placeHolder : ""}
          returnKeyType="done"
          value={props.value}
          style={[styles.textInput, customStyleTextInput(), props.style]}
          onChangeText={props.onchange}
          maxLength={10}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {props.error && <Text style={styles.errorMessage}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
  },
  divider: {
    backgroundColor: "rgba(77, 77, 77, 0.5)",
    width: 1,
    height: "70%",
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#DEDFE1",
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "center",
  },
  textInput: {
    flex: 0.8,
    color: Colors.black,
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlign: "left",
    left: 5,
    fontSize: 18,
    textAlignVertical: "center",
    alignItems: "center",
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistMedium,
    height: 39,
  },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
  leftText: {
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlign: "left",
    left: 5,
    lineHeight: 22,
    fontWeight: "600",
  },
  button: {
    justifyContent: "center",
  },
  label: {
    left: 0,
    fontSize: 18,
    color: "#aaa",
    fontFamily: fonts.urbanistMedium,
  },
});

export default React.memo(CountryCodeInput);
