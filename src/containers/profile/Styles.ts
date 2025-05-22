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
    marginHorizontal: wp(6),
    marginTop: hp(2),
  },
  centerSection: {
    gap: 10,
    marginTop: hp(3),
    paddingBottom: 10,
  },
  input: {
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.grey,
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 16,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: hp(6.3),
    borderRadius: 10,
  },
  changePasswordButton: { marginTop: hp(3) },
  text: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 22,
    fontFamily: fonts.urbanistSemiBold,
  },
  containerStyle: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 6,
  },
  numberInput: {
    paddingLeft: 10,
    paddingTop: 0,
  },
  buttonTextStyle: {
    fontSize: 19,
  },
});
