import React from "react";
import { Modal, Platform, View, ActivityIndicator } from "react-native";

import styles from "./style";
import Colors from "@assets/colors/Colors";

interface ILoader {
  loading?: boolean;
}
export const Loader = (props: ILoader) => {
  const { loading } = props;
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={Colors.primary_color} size="large" />
        </View>
      </View>
    </Modal>
  );
};
