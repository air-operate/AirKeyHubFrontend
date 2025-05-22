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
    marginTop: hp(1),
  },
  title: {
    fontSize: 20,
    color: Colors.black,
    marginVertical: hp(2),
    fontFamily: fonts.urbanistSemiBold,
    marginBottom: hp(4),
  },
  shadowStyle: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    paddingHorizontal: wp(4),
    borderRadius: 10,
    paddingVertical: hp(2),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  deleteButton: {color: Colors.error_red}
});
