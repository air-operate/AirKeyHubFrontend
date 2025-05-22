import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AirKeyButton } from "../atom/airKeyButton";
import CustomModal from "../atom/CustomModal";
import { fonts } from "@assets/fonts";

type props = {
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  title?:
    | "Register New key"
    | "Collect key"
    | "Give a key"
    | "Retire Key"
    | "Report Key"
    | "Key info"
    | undefined;
  data?: {
    box_id: string;
    key_slot_location: number;
    key_id: string;
    _id: string;
    key_status: number;
  };
  linkKeyPress?: () => void;
  onpressUpdate?: (keyStatus: number) => void;
  retireKey?: (opt: number) => void;
};

const HomeKeysModal = (props: props) => {
  const {
    modalVisibility,
    setModalVisibility,
    title,
    data,
    linkKeyPress,
    onpressUpdate,
    retireKey,
  } = props;
  const closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <CustomModal visible={modalVisibility} closeModal={closeModal}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.header}>
        <Text style={styles.boxIdText}>{translate("boxId")}</Text>
        <Text style={styles.boxIdText}>{data ? data.box_id : "B12"}</Text>
      </View>
      <View
        style={title === "Key info" ? styles.slotHeaderView : styles.header}
      >
        <Text style={styles.boxIdText}>{translate("slotNumber")}</Text>
        <Text style={styles.boxIdText}>
          {data ? data.key_slot_location : "FSKP123"}
        </Text>
      </View>
      {title === "Register New key" && (
        <AirKeyButton
          text={translate("linkKeyText")}
          buttonStyle={styles.button}
          onPressOut={() => {
            linkKeyPress && linkKeyPress();
          }}
        />
      )}
      {(title === "Collect key" || title === "Give a key") && (
        <AirKeyButton
          text={translate("confirmCollection")}
          onPress={() =>
            onpressUpdate && onpressUpdate(title === "Collect key" ? 1 : 2)
          }
        />
      )}
      {title === "Retire Key" && (
        <View style={styles.collectView}>
          <TouchableOpacity
            style={[styles.availableView]}
            onPressOut={() => {
              retireKey && retireKey(2);
            }}
          >
            <Text style={[styles.availableText]}>{translate("retireKey")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.availableView]}
            onPressOut={() => {
              retireKey && retireKey(1);
            }}
          >
            <Text style={[styles.availableText]}>
              {translate("replaceKey")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomModal>
  );
};

export default HomeKeysModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.black,
    lineHeight: 24,
    textAlign: "center",
    marginTop: hp(2.5),
    marginBottom: hp(2),
    fontFamily: fonts.urbanistBold,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 1,
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted',
    paddingBottom: hp(1),
    paddingHorizontal: hp(1),
    alignItems: "center",
    marginTop: hp(1),
  },
  slotHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: hp(1),
    paddingHorizontal: hp(1),
    alignItems: "center",
    marginTop: hp(1),
  },
  boxIdText: {
    fontSize: 12,
    color: Colors.black,
    lineHeight: 22,
    fontFamily: fonts.urbanistMedium,
  },
  button: {
    marginTop: hp(5),
    marginBottom: hp(1.5),
  },
  collectView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(1.5),
    marginBottom: hp(2.5),
  },
  markStatus: {
    fontSize: 17,
    color: Colors.black,
    lineHeight: 20.4,
    fontFamily: fonts.urbanistBold,
  },
  availableView: {
    backgroundColor: Colors.primary_color,
    paddingHorizontal: hp(1.5),
    height: hp(3.5),
    borderRadius: hp(2),
    alignItems: "center",
    justifyContent: "center",
  },
  availableText: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 20.4,
    fontFamily: fonts.urbanistSemiBold,
  },
  giveAKeyStyle: {
    backgroundColor: "#DA8E1D",
    paddingHorizontal: hp(2),
    borderRadius: hp(2),
  },
});
