import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { fonts } from "@assets/fonts";
import RenderHTML from "react-native-render-html";

type Props = {
  data: string;
};
const TermsConditionList = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <RenderHTML source={{ html: data }} contentWidth={wp(100) - wp(6)} />
      </ScrollView>
    </View>
  );
};

export default TermsConditionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2.5),
    marginHorizontal: wp(6),
    backgroundColor: Colors.white,
    elevation: 3,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(2),
    marginBottom: hp(1.7),
    borderRadius: 10,
    shadowColor: Colors.grey,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
