import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Checkmark_Icon } from "@assets/images/indexes";
type Props = {
  message?: string;
  visible?: boolean;
  closeModal?: () => void;
  disable?: boolean;
  closing?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ResponseModal = (props: Props) => {
  const { message, visible, setVisible } = props;
  const toggleModal = () => {
    setVisible && setVisible(false);
  };
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible && setVisible(false)}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={{
              marginTop: -28,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2014/04/02/10/24/checkmark-303752_1280.png",
              }}
              style={{ height: 60, width: 60 }}
            />
          </View>
          <Text
            style={{
              fontWeight: "600",
              marginTop: 10,
              padding: 10,
              fontSize: 18,
            }}
          >
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ResponseModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  contentContainer: {
    height: "15%",
    maxWidth: "90%",
    backgroundColor: "#F6EEEC",
    borderRadius: 20,
  },
});
