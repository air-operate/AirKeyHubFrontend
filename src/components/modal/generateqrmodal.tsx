import Colors from "@assets/colors/Colors";
import { Right_Arrow } from "@assets/images/indexes";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AirKeyButton } from "../atom/airKeyButton";
import CustomModal from "../atom/CustomModal";
import AddKeyInput from "../inputs/addKeyInput";

type props = {
  generateQRVisibility: boolean;
  setGenerateQRVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  selectDate: () => void;
  formattedDate?: string;
  generateCollectionCode?: () => void;
  onPressCheckBox?: () => void;
  expire?: boolean;
  error?: string;
  value?: string;
  onChange?: (text: string) => void;
};

const GenerateQRModal = ({
  formattedDate,
  generateQRVisibility,
  selectDate,
  setGenerateQRVisibility,
  generateCollectionCode,
  expire,
  onPressCheckBox,
  onChange,
  value,
}: props) => {
  const closeModal = () => {
    setGenerateQRVisibility(false);
  };

  return (
    <CustomModal visible={generateQRVisibility} closeModal={closeModal}>
      <Text style={styles.title}>{translate("validityQR")}</Text>
      <AddKeyInput
        placeHolder="Tag name"
        onChange={(text) => onChange && onChange(text.toString())}
      />
      <TouchableOpacity style={styles.validityButton} onPressOut={selectDate}>
        <Text style={styles.validityText}>
          {formattedDate ? (
            <Text>{formattedDate}</Text>
          ) : (
            translate("setValidity")
          )}
        </Text>
        <Right_Arrow />
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkBoxView} onPressOut={onPressCheckBox}>
        {/* <TouchableOpacity onPressOut={onPressCheckBox}> */}
          <View style={expire ? styles.checkBox : styles.unCheckBox} />
          <Text style={styles.expireText}>{translate('reUseable')}</Text>
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
      <AirKeyButton
        buttonStyle={[
          styles.generateQr,
          ((!formattedDate && !expire) || value == "") && {
            backgroundColor: Colors.light_grey,
          },
        ]}
        text={translate("generateCode")}
        onPress={generateCollectionCode}
        disable={!formattedDate && !expire ? true : value == "" ? true : false}
      />
    </CustomModal>
  );
};

export default GenerateQRModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center",
    marginTop: hp(3),
  },
  validityButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    borderRadius: hp(1.5),
    marginTop: hp(3),
  },
  validityText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "600",
    lineHeight: 22,
  },
  generateQr: {
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  checkBox: {
    backgroundColor: Colors.black,
    height: hp(2.2),
    width: hp(2.2),
    borderRadius: 3,
  },
  unCheckBox: {
    backgroundColor: "#E7E7E7",
    height: hp(2.2),
    width: hp(2.2),
    borderRadius: 3,
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    top: hp(2),
    marginBottom: hp(1),
  },
  expireText: {
    fontSize: 13,
    color: Colors.black,
    fontWeight: "500",
    lineHeight: 22,
  },
});
