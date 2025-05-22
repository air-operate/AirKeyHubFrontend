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
  header: {
    marginHorizontal: wp(6),
    marginTop: hp(2),
  },
  label: {
    fontSize: 15,
    color: "#8F8F8F",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 0,
  },
  input: {
    paddingBottom: hp(0.6),
    marginTop: hp(0),
  },
  centerSection: {
    marginTop: hp(4),
    gap: hp(2.5),
  },
  textInput: { right: 2.2 },
  saveButton: { marginTop: hp(5) },
  errorMessage: {
    color: "#cc0000",
    fontSize: 13,
    marginTop: 7,
    textAlign: "center",
  },
});
