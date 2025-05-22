import { StyleSheet } from "react-native";
import Colors from "../../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
  },
  logo: { flex: 1 },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 64,
    color: Colors.white,
    lineHeight: 64,
    marginHorizontal: "20%",
    textAlign: "center",
    fontFamily: fonts.urbanistBold,
  },
});
