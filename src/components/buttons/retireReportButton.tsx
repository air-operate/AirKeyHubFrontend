import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP } from "@assets/sizes/Sizes";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
const screenWidth = Dimensions.get("window").width;

type props = {
  image: ImageSourcePropType;
  text: string;
  onPress: () => void;
};

const RetireReportButton = (props: props) => {
  const { image, text, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.icon} source={image} resizeMode="contain" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RetireReportButton;

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(23),
    width: screenWidth / 2.34,
    backgroundColor: Colors.white,
    elevation: 3,
    marginVertical: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 16.8,
    fontFamily: fonts.urbanistSemiBold,
  },
  icon: { height: heightPercentageToDP(6), width: heightPercentageToDP(6) },
});
