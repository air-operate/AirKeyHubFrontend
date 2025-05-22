import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { getData, storeData } from "src/asyncstorage";
import { storage } from "src/asyncstorage/storage";

type Props = {
  onPress?: (status: boolean) => void;
};
const NotificationSwitch = ({ onPress }: Props) => {
  useEffect(() => {
    getNotificationState();
  }, []);

  async function getNotificationState() {
    if (storage.contains("Notification")) {
      let data = await getData("Notification");
      setIsEnabled(data == "true" ? true : false);
    } else {
      setIsEnabled(true);
    }
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const onToggle = () => {
    setIsEnabled((previousState) => !previousState);
    storeData("Notification", !isEnabled ? "true" : "false");
    onPress && onPress(!isEnabled);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{translate("notification")}</Text>
      <SwitchToggle
        containerStyle={styles.toggleContainer}
        backgroundColorOn="#65C466"
        backgroundColorOff="#e5e1e0"
        circleStyle={styles.toggleCircle}
        switchOn={isEnabled}
        onPress={onToggle}
        circleColorOff="white"
        circleColorOn={Colors.white}
        duration={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    paddingHorizontal: wp(4),
    borderRadius: 10,
    paddingVertical: hp(2),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
  },
  toggleContainer: {
    width: hp(5.5),
    height: hp(3.2),
    borderRadius: 25,
    padding: 2,
  },
  toggleCircle: {
    width: hp(2.7),
    height: hp(2.7),
    borderRadius: 20,
  },
});

export default React.memo(NotificationSwitch);
