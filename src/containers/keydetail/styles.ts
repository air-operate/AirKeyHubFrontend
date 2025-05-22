import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: { marginHorizontal: "6%", marginTop: "4%" },
  footer: { marginHorizontal: "6%", marginBottom: 10 },
  backButton: {
    marginHorizontal: "6%",
    marginTop: "4%",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.black,
    lineHeight: 13,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    fontWeight: "500",
    color: "#696F74",
    lineHeight: 16,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    marginVertical: "3%",
  },
  centerSection: {
    backgroundColor: Colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    borderRadius: 8,
    elevation: 2,
    marginVertical: 10,
    gap: 10,
  },
  innerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
  },
  name: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.black,
    lineHeight: 14.4,
  },
  email: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
    lineHeight: 11.5,
  },
  address: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(105, 111, 116, 1)",
  },
  direction: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.black,
    textDecorationLine: "underline",
  },
  time: {
    fontSize: 9,
    fontWeight: "500",
    color: Colors.black,
    backgroundColor: "rgba(237, 241, 243, 1)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  divider: {
    borderBottomWidth: Platform.OS === "android" ? 1 : 0.5,
    borderStyle: Platform.OS === "android" ? "dotted" : "solid",
    marginTop: "3%",
    marginBottom: "2%",
    borderColor: Colors.grey,
    marginHorizontal: hp(3),
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  availableView: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: "rgba(81, 214, 0, 1)",
  },
  shareQrButton: { backgroundColor: Colors.black },
  qrView: {
    marginVertical: hp(1.5),
    marginHorizontal: hp(3),
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: hp(3.2),
  },
  qrText: {
    fontSize: 14,
    lineHeight: 14.4,
    color: Colors.black,
    fontFamily: fonts.urbanistBold,
  },
  code: {
    fontSize: 16,
    fontFamily: fonts.urbanistBold,
    lineHeight: 19.2,
    letterSpacing: 0.5,
    color: Colors.black,
  },
  codeText: {
    fontFamily: fonts.urbanistMedium,
  },
});
