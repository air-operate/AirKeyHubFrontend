import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

type props = {
  label?: string;
  value?: string;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
};

const CodeCollectionList = (props: props) => {
  const { label, value, color } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.labelStyle]}>{label}</Text>
      <Text style={[styles.value, { color: color }]}>{value}</Text>
    </View>
  );
};

export default CodeCollectionList;

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  label: {
    fontSize: 12,
    color: Colors.black,
    lineHeight: 11.52,
    fontFamily: fonts.urbanistBold,
  },
  value: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: "500",
    fontFamily: fonts.urbanistMedium,
    // lineHeight: 11.52,
  },
});
