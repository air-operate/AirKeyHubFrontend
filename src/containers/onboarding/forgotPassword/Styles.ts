import { StyleSheet } from "react-native";
import Colors from "../../../assets/colors/Colors";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { fonts } from "@assets/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: { marginHorizontal: "6%", flex: 1 },
  centerSection: { marginVertical: "10%", flex: 1 },
  forgotPasswordText: {
    fontSize: 27,
    color: Colors.black,
    lineHeight: 32.4,
    letterSpacing: 0.5,
    marginVertical: hp(2.5),
    fontFamily: fonts.urbanistBold,
  },
  resendText: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 22,
    marginTop: "3%",
    textAlign: "center",
  },
});
