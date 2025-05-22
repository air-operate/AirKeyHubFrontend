import Colors from "@assets/colors/Colors";
import { Camera_Icon, ProfileIcon } from "@assets/images/indexes";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type props = {
  text?: string;
  onPress?: () => void;
  imageSource?: ImageSourcePropType;
  disabled?: boolean;
};
const ProfileCapture = (props: props) => {
  const { text, imageSource, disabled } = props;

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        {imageSource ? (
          <ImageBackground
            style={styles.image}
            source={imageSource}
            borderRadius={hp(12)}
          ></ImageBackground>
        ) : (
          <ProfileIcon
            height={styles.image.height + 20}
            width={styles.image.height + 20}
            style={styles.image}
          />
        )}
        <TouchableOpacity
          onPress={props.onPress}
          style={styles.cameraButton}
          disabled={disabled}
        >
          <Camera_Icon />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ProfileCapture;

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
    position: "absolute",
  },
  cameraButton: {
    backgroundColor: Colors.white,
    height: hp(4.5),
    width: hp(4.5),
    borderRadius: hp(4.5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    left: 13,
    elevation: 3,
    bottom: -hp(4),
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
  },
});
