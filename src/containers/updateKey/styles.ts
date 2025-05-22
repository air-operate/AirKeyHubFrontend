import Colors from "@assets/colors/Colors";
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
  header: { marginHorizontal: "6%", marginTop: "4%" },
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
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
  },
  closeButton: { marginTop: hp(0.1), alignSelf: "flex-end" },
  footer: {
    marginHorizontal: "6%",
    marginBottom: "5%",
  },
  errorMessage: {
    color: "#cc0000",
    fontSize: 13,
    marginTop: 7,
  },
});
