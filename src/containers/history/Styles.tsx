import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: {
    marginHorizontal: wp(6),
    marginTop: hp(2),
  },
  listContainer: {
    backgroundColor: Colors.white,
    elevation: 3,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(2),
    borderRadius: 10,
    gap: 5,
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  listStyle: { marginTop: hp(3), flex: 1 },
  divider: {
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 1,
    borderStyle: Platform.OS === "android" ? "dotted" : "solid",
    marginVertical: hp(0.6),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: Colors.black,
    lineHeight: 11.52,
    fontFamily: fonts.urbanistBold,
  },
  roundIcon: {
    height: 10,
    width: 10,
    borderRadius: 20,
  },
  textStyle: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: fonts.urbanistMedium,
  },
  headerStyle: {
    fontSize: 18,
    color: Colors.primary_color,
    lineHeight: 20,
    fontFamily: fonts.urbanistBold,
    marginBottom: 10,
  },
});
