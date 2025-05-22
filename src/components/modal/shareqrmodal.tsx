import Colors from "@assets/colors/Colors";
import { Direction_Arrow } from "@assets/images/indexes";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomModal from "../atom/CustomModal";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { AirKeyButton } from "../atom/airKeyButton";

type props = {
  shareQRVisibility: boolean;
  setShareQRVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  collectionCode?: string;
  shareCode?: (code: string) => void;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  onPressExpireCode?: () => void;
};

const ShareQrModal = ({
  setShareQRVisibility,
  shareQRVisibility,
  collectionCode,
  shareCode,
  setFile,
  onPressExpireCode,
}: props) => {
  const closeModal = () => {
    setShareQRVisibility(false);
  };
  function onCapture(log: any) {
    setFile(log);
  }

  return (
    <CustomModal visible={shareQRVisibility} closeModal={closeModal}>
      <View style={styles.container}>
        <ViewShot onCapture={onCapture} captureMode="mount">
          <View style={styles.viewShotStyle}>
            <QRCode value={collectionCode} size={192} />
            <Text style={styles.code}>
              {translate("code")}
              <Text style={styles.codeText}>{collectionCode}</Text>
            </Text>
          </View>
        </ViewShot>
        <Text style={styles.text}>{translate("shareQrText")}</Text>
        <TouchableOpacity
          style={styles.shareCollectionButton}
          onPressOut={() => shareCode && shareCode(collectionCode ?? "")}
        >
          <Text style={styles.shareCollectionText}>
            {translate("shareCollectionCode")}
          </Text>
          <Direction_Arrow />
        </TouchableOpacity>
        {onPressExpireCode && (
          <AirKeyButton
            onPressOut={onPressExpireCode}
            text={translate("cancelCode")}
            buttonStyle={styles.expireCodeStyle}
          />
        )}
      </View>
    </CustomModal>
  );
};

export default ShareQrModal;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: hp(4) },
  text: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: "700",
    marginTop: hp(1.5),
    marginHorizontal: hp(6),
    textAlign: "center",
    lineHeight: 22,
  },
  code: {
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 27.6,
    letterSpacing: 0.5,
    color: Colors.black,
    marginTop: hp(2.6),
  },
  codeText: {
    fontSize: 23,
    fontWeight: "500",
    lineHeight: 27.6,
    letterSpacing: 0.5,
    color: Colors.black,
  },
  shareCollectionButton: {
    backgroundColor: Colors.primary_color,
    width: "100%",
    marginTop: heightPercentageToDP(2.4),
    paddingVertical: heightPercentageToDP(1.8),
    borderRadius: heightPercentageToDP(4),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  expireCodeStyle: {
    backgroundColor: Colors.black,
    width: "100%",
    marginBottom: heightPercentageToDP(1.5),
  },
  shareCollectionText: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20.57,
    letterSpacing: 0.7,
    color: Colors.white,
  },
  viewShotStyle: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
});
