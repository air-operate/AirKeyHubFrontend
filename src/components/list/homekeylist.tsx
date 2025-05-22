import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import IMAGES from "@assets/images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const KeyData = [
  { id: 1, name: "Register New key", images: IMAGES.register_Key_Icon },
  { id: 2, name: "Collect key", images: IMAGES.keyGuest_Icon },
  { id: 3, name: "Give a key", images: IMAGES.keyDrop_Icon },
];
const screenWidth = Dimensions.get("window").width;
type props = {
  onPressKey: (item: any) => void;
};
const HomeKeyList = (props: props) => {
  const { onPressKey } = props;
  return (
    <FlatList
      scrollEnabled={false}
      data={KeyData}
      numColumns={3}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => onPressKey(item)}
            style={styles.container}
          >
            <View style={styles.innerContainer}>
              <Image style={styles.icon} source={item.images} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default HomeKeyList;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 3.4,
    elevation: 3,
    backgroundColor: Colors.white,
    marginRight: wp(2),
    marginTop: hp(0.7),
    marginBottom: hp(1),
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  innerContainer: {
    alignItems: "center",
    paddingHorizontal: hp(2.5),
    paddingVertical: hp(5),
    gap: 8,
  },
  list: {
    alignItems: "center",
    marginLeft: 10,
  },
  icon: { height: hp(4.5), width: hp(4.5) },

  text: {
    fontSize: 14,
    color: Colors.black,
    textAlign: "center",
    lineHeight: 16.8,
    marginTop: hp(0.5),
    fontFamily: fonts.urbanistSemiBold,
  },
});
