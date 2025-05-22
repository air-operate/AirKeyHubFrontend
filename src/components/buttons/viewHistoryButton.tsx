import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { History_Icon, Right_Arrow } from "@assets/images/indexes";
import Colors from "@assets/colors/Colors";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import { fonts } from "@assets/fonts";

type Props = {
  onPress?: () => void;
  title?: string;
};
const ViewHistoryButton = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <History_Icon />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Right_Arrow />
    </TouchableOpacity>
  );
};

export default ViewHistoryButton;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 3,
    paddingVertical: hp(1.6),
    paddingHorizontal: hp(1.3),
    borderRadius: 8,
    marginHorizontal: hp(3),
    marginVertical: hp(1.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 5 },
  text: {
    fontSize: 13,
    lineHeight: 22,
    color: Colors.black,
    fontFamily: fonts.urbanistSemiBold,
  },
});
