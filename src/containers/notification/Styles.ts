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
  header: {
    paddingHorizontal: wp(6),
    marginTop: hp(2),
  },
  alertStyle: {
    textAlign: "center",
    marginTop: hp(5),
    color: Colors.black,
    fontSize: hp(2),
    fontFamily: fonts.urbanistSemiBold,
  },
});
