import { StyleSheet } from "react-native";
import Colors from "../../../assets/colors/Colors";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { fonts } from "@assets/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: { marginHorizontal: "6%" },
  centerSection: { marginVertical: "8%" },
  innerView: {
    marginVertical: "5%",
  },
  newPasswordText: {
    fontSize: 27,
    color: Colors.black,
    lineHeight: 32.4,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistBold,
  },
  label: {
    fontSize: 15,
    color: "#8F8F8F",
    letterSpacing: 0.5,
    marginTop: hp(2),
    lineHeight: 18,
    fontFamily: fonts.urbanistSemiBold,
    left: 3.5,
  },
  centerView: { marginTop: hp(6) },
  submitButton: { marginTop: hp(11) },
});
