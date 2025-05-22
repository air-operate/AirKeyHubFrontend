import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { Right_Arrow } from "@assets/images/indexes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type props = {
  text: string;
  onPress?: () => void;
  textStyle?: TextStyle;
};

const SettingsButton = (props: props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={[styles.label, props.textStyle]}>{props.text}</Text>
      <Right_Arrow />
    </TouchableOpacity>
  );
};

export default React.memo(SettingsButton);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    paddingHorizontal: wp(4),
    borderRadius: 10,
    paddingVertical: hp(2),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: fonts.urbanistSemiBold,
  },
});
