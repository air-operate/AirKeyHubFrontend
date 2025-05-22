import Colors from "@assets/colors/Colors";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

type props = {
  isVisible: boolean;
  onClose?: () => void;
  onPressCamera?: () => void;
  onPressGallery?: () => void;
};

const ProfileModal = (props: props) => {
  const { isVisible, onClose, onPressCamera, onPressGallery } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <SafeAreaView style={styles.modalContent}>
        <TouchableOpacity onPress={onPressCamera} style={styles.cameraButton}>
          <Text style={styles.label}>{translate("camera")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressGallery}
          style={[styles.cameraButton, styles.galleryButton]}
        >
          <Text style={styles.label}>{translate("gallery")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={[styles.label, styles.cancelText]}>
            {translate("cancel")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "transparent",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cameraButton: {
    backgroundColor: Colors.white,
    height: hp(5.5),
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    borderTopLeftRadius: hp(1.5),
    borderTopRightRadius: hp(1.5),
  },
  galleryButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: hp(1.5),
    borderBottomRightRadius: hp(1.5),
  },
  cancelButton: {
    backgroundColor: Colors.white,
    height: hp(5.5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(1.5),
    marginTop: hp(0.3),
  },
  cancelText: { color: Colors.primary_color },
  label: { color: Colors.black, fontSize: 16, fontWeight: "400" },
});

export default ProfileModal;
