import { Platform, StyleSheet } from "react-native";
import Colors from "../../assets/colors/Colors";

export const styles = StyleSheet.create({
  tabBarIndicatorStyle: {
    backgroundColor: "transparent",
  },
  tabBarStyle: {
    backgroundColor: Colors.primary_color,
    // // paddingBottom: Platform.OS === "android" ? 15 : 45,
    borderRadius: 40,
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    height: 70,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    textTransform: "none",
  },
  tabBarIconView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "red",
    position: "absolute",
    right: 33,
    top: 7,
    height: 15,
    width: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
  },
});
