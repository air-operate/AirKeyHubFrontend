import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  contentContainer: { flex: 1, marginHorizontal: "6%", marginVertical: "4%" },
  listContainer: {
    marginVertical: hp(2),
  },
  cardField: {
    backgroundColor: Colors.white,
    flex: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 50,
    borderRadius: hp(1),
    marginHorizontal: 2,
  },
  header: {
    fontFamily: fonts.urbanistBold,
    fontSize: hp(2),
    textAlign: "center",
    paddingVertical: hp(2),
    color: Colors.black,
  },
  errorStyle: {
    color: Colors.error_red,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 16,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
  emptyListConatiner:{
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center'
  }
});
