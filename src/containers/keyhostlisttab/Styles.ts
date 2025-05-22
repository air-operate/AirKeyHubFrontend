import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";
import { Styles } from "react-native-google-places-autocomplete";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  header: {
    marginHorizontal: wp(6),
    marginTop: hp(2),
    zIndex: 1,
    height: 90,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.black,
    lineHeight: 25.2,
  },
  footer: { marginTop: hp(2), flex: 2 },
});

export const searchBoxStyle: Object | Partial<Styles> = {
  container: {
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textInput: {
    height: 50,
    color: Colors.black,
  },
  powered: {
    height: 10,
  },
  listView: {
    position: "absolute",
    zIndex: 1,
    top: 50,
  },
};
