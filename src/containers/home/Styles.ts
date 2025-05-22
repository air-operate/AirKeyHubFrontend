import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { StyleSheet } from "react-native";
import Colors from "../../assets/colors/Colors";
import { fonts } from "@assets/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.app_white,
    paddingBottom: hp(5.9),
  },
  contentConatiner: { flex: 1, marginTop: 10 },
  header: { paddingHorizontal: "6%", flex: 1, paddingBottom: "4%" },
  keyImage: { height: 14, width: 16 },
  headers: { flexDirection: "row" },
  centerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(1.5),
  },
  addKeysButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary_color,
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: hp(0.4),
    paddingHorizontal: hp(1.8),
    gap: 4,
  },
  filterButton: {
    height: 48,
    width: 48,
    borderRadius: 10,
    backgroundColor: Colors.primary_color,
    justifyContent: "center",
    alignItems: "center",
  },
  keyCatalog: {
    fontSize: 18,
    color: Colors.black,
    lineHeight: 20,
    fontFamily: fonts.urbanistBold,
  },
  keyAddText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.urbanistSemiBold,
  },
  addKeyButton: {
    height: 36,
    width: 105,
    backgroundColor: Colors.white,
    borderRadius: 18,
    alignSelf: "center",
    marginVertical: "8%",
    alignItems: "center",
    justifyContent: "center",
  },
});
