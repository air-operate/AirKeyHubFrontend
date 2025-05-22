import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
type props = {
  text?: string;
  imageSource?: string;
};
const HostProfileView = React.memo((props: props) => {
  const { text, imageSource } = props;

  return (
    <View style={styles.container}>
      {imageSource ? (
        <View style={styles.button}>
          <Image
            style={styles.image}
            source={{ uri: imageSource }}
            borderRadius={hp(12)}
          />
        </View>
      ) : (
        <View style={styles.roundView}>
          <Text style={styles.roundViewText}>
            {text && text[0].toUpperCase()}
          </Text>
        </View>
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
});

export default HostProfileView;

const styles = StyleSheet.create({
  container: { marginTop: hp(2.5), gap: 8 },
  button: {
    borderColor: "#3B719F",
    borderWidth: 1.5,
    height: hp(13),
    width: hp(13),
    borderRadius: hp(13),
    alignSelf: "center",
    padding: hp(0.5),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: hp(12.2),
    width: hp(12.2),
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
    color: Colors.black,
    textAlign: "center",
    fontFamily: fonts.urbanistSemiBold,
  },
  roundView: {
    height: hp(13),
    width: hp(13),
    borderRadius: hp(13),
    alignSelf: "center",
    padding: hp(0.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary_color,
  },
  roundViewText: {
    fontSize: hp(10),
    color: Colors.white,
    textAlign: "center",
    fontFamily: fonts.urbanistSemiBold,
  },
});
