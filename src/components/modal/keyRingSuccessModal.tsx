import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { Success_Logo } from "@assets/images/indexes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { registerNewKeyStateReset } from "src/redux/slices/registerNewKey";

type props = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch?: any;
  data?: {
    box_id: string;
    key_slot_location: number;
  };
  title?: string;
};

const KeyRingSuccessModal = (props: props) => {
  const { isVisible, setVisible, dispatch, data, title } = props;
  const handleContinuePress = () => {
    setVisible(false);
    dispatch(registerNewKeyStateReset());
  };
  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.logoView}>
          <Success_Logo />
        </View>
        <Text style={styles.successText}>
          {title === "Register New key"
            ? translate("keyRingSuccess")
            : title === "Retire Key"
            ? translate("retireKey")
            : translate("inUseSuccess")}
        </Text>
        <Text style={styles.descriptionText}>
          {title === "Register New key"
            ? translate("keyRingDescription")
                .replace("{{box_id]]", data ? data?.box_id : "")
                .replace(
                  "{{slot]]",
                  data ? data?.key_slot_location.toString() : ""
                )
            : title === "Collect key"
            ? translate("keyRingDescription")
                .replace("{{box_id]]", data ? data?.box_id : "")
                .replace(
                  "{{slot]]",
                  data ? data?.key_slot_location.toString() : ""
                )
            : title === "Retire Key"
            ? translate("retireDescription")
            : translate("inUseDescription")}
        </Text>
        <View style={styles.centerView}>
          <Text style={styles.boxText}>
            {translate("boxNO") + `${data ? data?.box_id : "B12"}` + ", "}
          </Text>
          <Text style={styles.boxText}>
            {translate("slotNumber") +
              ":" +
              `${data ? data?.key_slot_location : "FSKP123"}`}
          </Text>
        </View>
        <View style={styles.continueView}>
          <TouchableOpacity
            onPress={handleContinuePress}
            style={styles.continueButton}
          >
            <Text style={styles.text}>{translate("continue")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.app_white,
    paddingHorizontal: wp(2),
    paddingTop: hp(3),
  },
  logoView: {
    backgroundColor: Colors.primary_color,
    height: hp(13),
    width: hp(13),
    borderRadius: hp(13),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: hp(25),
  },
  successText: {
    fontSize: 24,
    lineHeight: 28.8,
    color: Colors.black,
    textAlign: "center",
    marginTop: hp(4),
    fontFamily: fonts.urbanistBold,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.black,
    textAlign: "center",
    marginTop: hp(1),
    marginHorizontal: hp(7),
    fontFamily: fonts.urbanistRegular,
  },
  text: {
    fontSize: 22,
    lineHeight: 26.4,
    color: Colors.white,
    letterSpacing: 0.2,
    fontFamily: fonts.urbanistSemiBold,
  },
  continueView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  continueButton: {
    backgroundColor: Colors.primary_color,
    alignSelf: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(3.4),
    borderRadius: hp(3),
    marginBottom: hp(7),
  },
  centerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(1),
  },
  boxText: {
    fontSize: 13,
    lineHeight: 22,
    color: Colors.black,
    letterSpacing: 0.2,
    fontFamily: fonts.urbanistSemiBold,
  },
});

export default KeyRingSuccessModal;
