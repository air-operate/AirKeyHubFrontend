import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  data: {
    payment_method: string;
    exp_month: number;
    exp_year: number;
    last4: string;
  };
  selected?: boolean;
  onPressItem?: (card: string) => void;
};
const PaymentCard = ({ data, onPressItem, selected }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressItem && onPressItem(data.payment_method)}
    >
      <View style={styles.flex}>
        <Text style={styles.textStyle}>xxxx xxxx xxxx {data.last4}</Text>
        <Text style={styles.textStyle}>
          {data.exp_month}/{data.exp_year.toString().split("20")[1]}
        </Text>
      </View>
      {selected ? (
        <View style={styles.selectedCheckBox}>
          <View style={styles.innerView} />
        </View>
      ) : (
        <View style={styles.checkBox} />
      )}
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: wp(1),
    padding: hp(2),
    borderRadius: wp(2),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textStyle: {
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
    fontSize: hp(2),
  },
  flex: {
    flex: 1,
    gap: hp(1),
  },
  checkBox: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  selectedCheckBox: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary_color,
    alignItems: "center",
    justifyContent: "center",
  },
  innerView: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: Colors.primary_color,
  },
});
