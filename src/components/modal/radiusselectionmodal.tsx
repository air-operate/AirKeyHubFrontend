import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import Slider from "@react-native-community/slider";
import { translate } from "@translations/translate";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type props = {
  radiusValue: number;
  setRadiusValue: React.Dispatch<React.SetStateAction<number>>;
};

const RadiusSelectionModal = (props: props) => {
  const { radiusValue, setRadiusValue } = props;

  const handleValueChange = (value: number) => {
    setRadiusValue(value);
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.text}>{translate("customRadius")}</Text>
      <Text style={styles.description}>
        {translate("customRadiusDescription")}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3000}
        step={1}
        value={radiusValue}
        onValueChange={handleValueChange}
        thumbTintColor="#D9D9D9"
        minimumTrackTintColor={Colors.primary_color}
      />
    </View>
  );
};

export default RadiusSelectionModal;
const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    padding: 20,
  },

  text: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: hp(1),
  },
  description: {
    color: "#838383",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 14.4,
    marginTop: hp(0.4),
  },
  slider: {
    // transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
    marginVertical: hp(2),
    marginBottom: hp(3),
    color: "red",
  },
});
