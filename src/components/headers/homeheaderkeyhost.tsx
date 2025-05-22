import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import IMAGES from "@assets/images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HostData } from "src/typings/global";

type Props = {
  data?: HostData;
  onPressProfile?: () => void;
  onPressNotification?: () => void;
  unreadCount?: number;
};
const HomeHeaderKeyHost = ({
  data,
  onPressProfile,
  onPressNotification,
  unreadCount,
}: Props) => {
  const HomeHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftView} onPress={onPressProfile}>
          {!data?.profileImage ? (
            <View style={styles.profileView}>
              <Text style={styles.name}>{data?.name[0].toUpperCase()}</Text>
            </View>
          ) : (
            <Image
              source={{ uri: data?.profileImage }}
              style={styles.profileView}
            />
          )}
          <Text style={styles.nameText}>{data?.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNotification}>
          <ImageBackground
            source={IMAGES.notification_icon}
            style={styles.notification_logo}
            tintColor={Colors.white}
          >
            {unreadCount !== 0 && (
              <View style={styles.notificationView}>
                <Text style={styles.cartCount}>{unreadCount}</Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ImageBackground source={IMAGES.home_background} style={styles.container}>
      <Image source={IMAGES.home_ellipse} resizeMode="contain" />
      <HomeHeader />
    </ImageBackground>
  );
};

export default HomeHeaderKeyHost;

const styles = StyleSheet.create({
  container: { height: hp(29.5), width: "100%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: Platform.OS === "android" ? hp(18) : hp(14),
    marginHorizontal: wp(4),
    paddingTop: hp(2),
  },
  leftView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  profileView: {
    backgroundColor: "#72BCB8",
    borderRadius: hp(4.5),
    height: hp(4.5),
    width: hp(4.5),
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24.52,
    lineHeight: 28.73,
    textAlign: "center",
    color: Colors.white,
    fontFamily: fonts.urbanistMedium,
  },
  nameText: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.white,
    fontFamily: fonts.urbanistSemiBold,
  },
  notification_logo: {
    height: 27,
    width: 21,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  notificationView: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: "red",
  },
  cartCount: {
    fontSize: 8,
    color: Colors.white,
    fontFamily: fonts.urbanistMedium,
    textAlign: "center",
  },
});
