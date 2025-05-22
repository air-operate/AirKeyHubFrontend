import Colors from "@assets/colors/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import CustomModal from "../atom/CustomModal";
import { fonts } from "@assets/fonts";
import { heightPercentageToDP } from "@assets/sizes/Sizes";

type props = {
  modalVisibility?: boolean;
  closeAllModal: () => void;
  error?: string;
};

const ScannedErrorModal = ({
  error,
  modalVisibility,
  closeAllModal,
}: props) => {
  const closeModal = () => {
    closeAllModal();
  };

  return (
    <CustomModal visible={modalVisibility} closeModal={closeModal}>
      <Text style={styles.errorMessage}>{error}</Text>
    </CustomModal>
  );
};

export default ScannedErrorModal;

const styles = StyleSheet.create({
  errorMessage: {
    color: Colors.black,
    fontSize: 20,
    marginTop: 7,
    fontFamily: fonts.urbanistBold,
    textAlign: "center",
    paddingVertical: heightPercentageToDP(3),
  },
});
