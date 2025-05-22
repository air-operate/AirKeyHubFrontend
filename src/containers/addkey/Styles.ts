import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: { marginHorizontal: "6%", marginTop: "4%", flex: 1 },
  centerSection: { marginVertical: hp(2.5), gap: 10 },
  description: { height: hp(16), textAlignVertical: "top" },
  selectedKeyHostButton: {
    height: hp(6.3),
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginTop: hp(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(3.5),
  },
  selectedKey: {
    color: Colors.black,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fonts.urbanistSemiBold,
  },
  closeButton: { marginTop: hp(0.1), alignSelf: "flex-end" },
  footer: {
    marginBottom: 10,
  },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
});
