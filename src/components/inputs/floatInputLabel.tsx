import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardTypeOptions,
  TextInputProps,
  ReturnKeyTypeOptions,
  TextStyle,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "@assets/colors/Colors";
import { HideEye, Open_Eye } from "@assets/images/indexes";
import { fonts } from "@assets/fonts";

interface CustomTextProps {
  value?: string | number;
  placeHolder?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: boolean;
  isEditable?: boolean;
  onPressIcon?: () => void;
  onChange?: (text: string | number) => void;
  inputProps?: TextInputProps;
  blur?: () => void;
  focus?: () => void;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  error?: string;
  showPassword?: boolean;
  maxLength?: number;
  multiline?: boolean;
  parentViewStyle?: StyleProp<ViewStyle>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  label?: string;
  headerStyle?: StyleProp<TextStyle>;
}

const FloatingLabelInput = (props: CustomTextProps) => {
  const {
    value,
    keyboardType,
    isEditable,
    icon,
    onPressIcon,
    onChange,
    placeHolder,
    returnKeyType,
    secureTextEntry,
    textInputStyle,
    error,
    showPassword,
    maxLength,
    multiline,
    parentViewStyle,
    autoCapitalize,
    label,
    headerStyle,
  } = props;
  const originRef = React.useRef<TextInput>();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[headerStyle, { paddingTop: 10 }]}>
      <Text
        style={{
          left: 0,
          fontSize: 18,
          color: "#aaa",
          fontFamily: fonts.urbanistMedium,
          top: !value && !isFocused ? 25 : 0,
        }}
      >
        {label}
      </Text>
      <View style={[styles.inputParentView, parentViewStyle]}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          ref={originRef as never}
          placeholder={placeHolder}
          placeholderTextColor={"#8F8F8F"}
          value={value as string}
          style={[styles.input, textInputStyle]}
          keyboardType={keyboardType || "default"}
          editable={isEditable}
          onChangeText={onChange}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
        {icon && (
          <TouchableOpacity onPress={onPressIcon}>
            {secureTextEntry ? <HideEye /> : <Open_Eye />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export default FloatingLabelInput;
const styles = StyleSheet.create({
  inputParentView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#DEDFE1",
  },
  input: {
    textAlignVertical: "center",
    alignItems: "center",
    flex: 1,
    color: Colors.black,
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistMedium,
    height: 39,
  },
  iconStyle: { height: 17, width: 17, marginRight: 15 },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
});
