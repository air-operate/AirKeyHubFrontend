import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginHorizontal: wp(5),
    margin: hp(2),
    height: 125,
    zIndex: 1,
  },
  footer: {},
});

export const searchBoxStyle = {
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
    color: "black",
  },
  powered: {
    height: 10,
  },
  listView: {
    position: "absolute",
    // zIndex: 1,
    top: 50,
  },
  row: {
    backgroundColor: 'white', // Optional: Set background for list items
  },
  rowText: {
    color: "black", // Set the text color for list items
  },
};
