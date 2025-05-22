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
  logo: {
    width: wp(100),
    height: hp(38),
  },
  backButton: {
    backgroundColor: Colors.white,
    height: hp(4),
    width: hp(4),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(4),
    marginLeft: hp(3),
  },
  centerSection: {
    backgroundColor: Colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    marginHorizontal: hp(3),
    elevation: 3,
    borderRadius: 10,
    bottom: hp(5.2),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontSize: 20,
    color: Colors.black,
    marginTop: 2,
    textAlign: "center",
    lineHeight: 22,
    fontFamily: fonts.urbanistBold,
  },
  input: {
    paddingBottom: 0,
    marginTop: hp(4),
  },
  submitButton: {
    backgroundColor: Colors.primary_color,
    height: hp(5.5),
    width: wp(29),
    borderRadius: hp(5),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(4),
    alignSelf: "center",
  },
  submitText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20.57,
    letterSpacing: 0.7,
  },
  errorText:{
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
    textAlign: 'center'
  }
});
