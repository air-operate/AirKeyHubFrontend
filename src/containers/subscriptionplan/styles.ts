import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: { marginHorizontal: "6%", marginTop: "4%" },
  title: {
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: 0.5,
    color: Colors.colorBlack,
    marginVertical: "3%",
    fontFamily: fonts.urbanistBold,
  },
  footer: { marginHorizontal: "6%", marginBottom: "5%" },
  voucherButton: {
    backgroundColor: Colors.white,
    elevation: 3,
    marginVertical: hp(1.3),
    marginHorizontal: 1,
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.8),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: Colors.black,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  voucherView: { flexDirection: "row", gap: 8, alignItems: "center" },
  voucherText: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 16.8,
    fontFamily: fonts.urbanistSemiBold,
  },
});
