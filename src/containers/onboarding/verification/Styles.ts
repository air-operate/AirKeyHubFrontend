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
  verificationText: {
    fontSize: 27,
    color: Colors.black,
    lineHeight: 32.4,
    letterSpacing: 0.5,
    marginVertical: hp(2),
    marginBottom: hp(5),
    fontFamily: fonts.urbanistBold,
  },
  centerSection: { marginVertical: hp(3) },
  enterOtpText: {
    fontSize: 32,
    color: Colors.black,
    lineHeight: 40,
    fontFamily: fonts.urbanistSemiBold,
  },
  descriptionText: {
    fontSize: 14,
    color: "rgba(84, 84, 84, 1)",
    lineHeight: 22,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistMedium,
  },
  centerView: { marginVertical: 10 },
  codeFieldView: {
    height: 70,
    width: 55.51,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
    borderBottomColor: "#E2E2E4",
    borderBottomWidth: 2,
    marginTop: hp(6),
  },
  codeTextStyle: {
    color: Colors.black,
    fontSize: 36,
    fontFamily: fonts.urbanistBold,
  },
  timeText: {
    color: Colors.primary_color,
    fontSize: 14,
    lineHeight: 22,
    marginTop: hp(1.8),
    fontFamily: fonts.urbanistRegular,
  },
  verificationDescription: {
    color: Colors.grey,
    fontSize: 14,
    lineHeight: 22,
    marginRight: "30%",
    letterSpacing: 0.5,
    marginVertical: "3%",
    fontFamily: fonts.urbanistRegular,
  },
  color: { color: Colors.primary_color },
  sendAgainText: {
    color: Colors.primary_color,
    fontSize: 14,
    lineHeight: 22,
    textDecorationLine: "underline",
    fontFamily: fonts.urbanistMedium,
  },
  verifyButton: { marginTop: hp(5) },
  error: {
    color: Colors.error_red,
    fontSize: 16,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
    textAlign: "center",
    marginVertical: hp(1),
  },
});
