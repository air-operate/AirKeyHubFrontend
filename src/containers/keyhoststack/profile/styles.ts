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
  centerSection: {
    gap: 10,
    marginTop: hp(3),
    paddingBottom: 10,
  },
  label: { fontWeight: "500" },
  input: {
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.grey,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: hp(6.3),
    borderRadius: 10,
    // padding: wp(3.5),
  },
  changePasswordButton: { marginTop: hp(3) },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    lineHeight: 22,
  },
  containerStyle: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  numberInput: {
    paddingLeft: 10,
    paddingTop: 5,
  },
});
