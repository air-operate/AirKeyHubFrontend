import Colors from "@assets/colors/Colors";
import { Key_Icon, Right_Direction } from "@assets/images/indexes";
import { heightPercentageToDP } from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type props = {
  onPress: () => void;
};
const KeyInfoButton = (props: props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <Key_Icon
          height={heightPercentageToDP(4.5)}
          width={heightPercentageToDP(4.5)}
        />
        <Text style={styles.text}>{translate("keyInfo")}</Text>
      </View>
      <Right_Direction />
    </TouchableOpacity>
  );
};

export default KeyInfoButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: heightPercentageToDP(11),
    marginHorizontal: heightPercentageToDP(2),
    elevation: 3,
    margin: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1.5),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  text: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "600",
    lineHeight: 16.8,
  },
});
