import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { KeyboardTypeOptions } from "react-native";

type AddKeyProps = {
  text?: string;
  value?: string | number;
  onChange?: (text: string | number) => void;
  textInputStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeHolder?: string;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  multiline?: boolean;
  editable?: boolean;
};

const AddKeyInput = (props: AddKeyProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      <TextInput
        style={[styles.input, props.textInputStyle]}
        value={props.value as string}
        onChangeText={props.onChange}
        placeholder={props.placeHolder}
        multiline={props.multiline}
        placeholderTextColor={Colors.light_grey}
        keyboardType={props.keyboardType}
        blurOnSubmit
        editable={props.editable}
      />
      {props.error && <Text style={styles.errorMessage}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 22,
    fontFamily: fonts.urbanistSemiBold,
  },
  input: {
    height: hp(6.3),
    backgroundColor: Colors.light,
    borderRadius: 10,
    paddingHorizontal: wp(3.5),
    fontFamily: fonts.urbanistMedium,
    fontSize: 14,
    color: Colors.black,
  },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
});

export default AddKeyInput;
