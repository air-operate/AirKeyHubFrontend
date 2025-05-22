import { Open_Eye } from "@assets/images/indexes";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import React from "react";
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

interface CustomTextProps {
  value?: string | number;
  placeHolder: string;
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
}

export const Input = React.memo((props: CustomTextProps): JSX.Element => {
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
  } = props;
  const originRef = React.useRef<TextInput>();

  return (
    <View>
      <View style={[styles.inputParentView, parentViewStyle]}>
        <TextInput
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
            <Open_Eye />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  inputParentView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#DEDFE1",
    paddingBottom: hp(1),
    marginTop: hp(0),
  },
  input: {
    textAlignVertical: "center",
    alignItems: "center",
    flex: 1,
    color: Colors.black,
    fontSize: 17,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistSemiBold,
    paddingBottom: 5,
  },
  iconStyle: { height: 17, width: 17, marginRight: 15 },
  errorMessage: {
    color: "#cc0000",
    fontSize: 13,
    marginTop: 7,
  },
});
