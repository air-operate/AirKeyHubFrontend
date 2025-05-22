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
  loginText: {
    fontSize: 27,
    color: Colors.black,
    marginVertical: hp(9),
    lineHeight: 32.4,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistBold,
  },
  centerSection: { marginTop: hp(7), flex: 1 },
  label: {
    fontSize: 15,
    color: "#8F8F8F",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: hp(2),
    left: 3,
  },
  forgotButton: {
    alignSelf: "center",
    marginVertical: hp(3),
  },
  forgotText: {
    fontSize: 13,
    color: "#14304A",
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: hp(4),
    marginBottom: hp(1.6),
  },
  checkBoxButton: {
    height: 18,
    width: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#3B719F",
  },
  rememberText: {
    fontSize: 15,
    color: "rgba(20, 48, 74, 1)",
    textAlign: "center",
    lineHeight: 16,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistSemiBold,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 5,
    marginBottom: 20
  },
  haveAnText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#C4C4C4",
    lineHeight: 16.8,
    letterSpacing: 0.5,
    fontFamily: fonts.urbanistRegular,
  },
  signUpText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.black,
    lineHeight: 18,
    letterSpacing: 0.5,
    fontWeight: "700",
    fontFamily: fonts.urbanistBold,
  },
  btnForgotPassword: {
    marginTop: hp(3),
  },
  loginButton: { marginTop: hp(3) },
  buildVersionText: {
    color: Colors.black,
    fontSize: hp(1.2),
    marginLeft: hp(1),
  },
  error: {
    color: Colors.error_red,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 16,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
    buttonText: {
      fontSize: 20,
      color: Colors.white,
      letterSpacing: 0.7,
      fontFamily: fonts.urbanistSemiBold,
    },
    buttonContainer: {
      backgroundColor: Colors.primary_color,
      borderRadius: 28.5,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
      height: 53,
    },
});
