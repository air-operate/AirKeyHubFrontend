import Colors from '@assets/colors/Colors';
import IMAGES from '@assets/images';
import { Flash_Icon, Left_Arrow, NFC } from '@assets/images/indexes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@assets/sizes/Sizes';
import { translate } from '@translations/translate';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { RNCamera } from 'react-native-camera';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirKeyButton } from '../atom/airKeyButton';
import Modal from 'react-native-modal';
import { fonts } from '@assets/fonts';

type Props = {
  isVisible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onPressSubmit?: (data: string) => void;
  setKeyCode: React.Dispatch<React.SetStateAction<any | undefined>>;
  keyCode?: string;
  error?: string;
};

const KeyModalQr = ({
  isVisible,
  setVisible,
  title,
  onPressSubmit,
  setKeyCode,
  keyCode,
}: Props) => {
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [showNfc, setShowNfc] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(false);
  const [isScanHandled, setIsScanHandled] = useState(false);

  const toggleFlash = () => {
    setFlashMode((prevMode: any) =>
      prevMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off
    );
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!isScanHandled && data) {
      setIsScanHandled(true); // Prevent further scans
      console.log('Scanned Data:', data);
      setShowNfc(false);
      setKeyCode(data);
      onPressSubmit && onPressSubmit(data);
    }
  };
  

  useEffect(() => {
    if (isVisible) {
      setIsScanHandled(false);
    }
  }, [isVisible]);
  
  const toggleNfc = async () => {
    setIsScanHandled(false);
    setShowNfc((prev) => !prev);
    if (!showNfc) {
      readTag();
    } else {
      NfcManager.cancelTechnologyRequest();
    }
  };
  

  // Function to read an NFC tag
  // const readTag = async () => {
  //   await NfcManager.registerTagEvent();
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
  //     if (tag.ndefMessage && tag.ndefMessage.length > 0) {
  //       const ndefPayload = tag.ndefMessage[0].payload;
  //       const textPayload = String.fromCharCode.apply(null, ndefPayload);
  //       console.log(textPayload);

  //       // const uid = getValueFromUrl(textPayload);
  //       handleBarCodeScanned({ data: textPayload });
  //       NfcManager.cancelTechnologyRequest();
  //     }
  //   });
  // };
  const readTag = async () => {
    await NfcManager.registerTagEvent();

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefPayload = tag.ndefMessage[0].payload;

        // First byte contains the status byte (encoding and language code length)
        const statusByte = ndefPayload[0];

        // Determine the length of the language code
        const languageCodeLength = statusByte & 0x3f; // Masking to get the lower 6 bits which represent language code length

        // The text starts after the language code
        const textPayloadBytes = ndefPayload.slice(1 + languageCodeLength);

        // Convert the remaining bytes into a string (text payload)
        const textPayload = String.fromCharCode.apply(null, textPayloadBytes);
        console.log(textPayload);

        // Handle the scanned data (the actual text payload)
        handleBarCodeScanned({ data: textPayload });

        // Cancel the NFC technology request to stop reading tags
        NfcManager.cancelTechnologyRequest();
      }
    });
  };

  // Clean up NFC on unmount
  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      setNfcSupported(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };
    checkIsSupported();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  function closeModal() {
    setVisible(false);
  }

  return (
    <Modal isVisible={isVisible} style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.modalContainer}
        >
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Left_Arrow style={styles.iconView} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity onPress={toggleFlash}>
              <Flash_Icon />
            </TouchableOpacity>
          </View>

          {/* Conditional rendering based on NFC toggle */}
          {showNfc ? null : (
            <RNCamera
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={flashMode}
              captureAudio={false}
              onBarCodeRead={handleBarCodeScanned}
            />
          )}

          <View style={[showNfc ? {} : styles.contentPosition]}>
            <Text style={styles.qrCodeText}>
              {!showNfc
                ? translate('qrCodeText')
                : translate(
                    Platform.OS === 'android'
                      ? 'holdWooftagToMiddleOfAndroid'
                      : 'holdWooftagToTopOfIphone'
                  )}
            </Text>
            {showNfc ? (
              <View style={styles.nfcView}>
                <NFC height={hp(10)} width={hp(10)} />
              </View>
            ) : (
              <ImageBackground
                resizeMode='contain'
                style={styles.cameraPortion}
                source={IMAGES.camera_Portion}
              />
            )}

            <Text style={styles.enterCodeText}>{translate('enterCode')}</Text>
            <TextInput
              placeholderTextColor={Colors.grey}
              style={styles.input}
              value={keyCode?.toString()}
              onChangeText={(e) => setKeyCode(e)}
              returnKeyType='done'
            />
            {/* <View style={styles.footer}> */}
              <AirKeyButton
                text={translate('submit')}
                buttonStyle={styles.submitButton}
                onPress={() => {
                  onPressSubmit && onPressSubmit(keyCode?.toString() || '');
                }}
              />
              {title !== 'Scan key QR' && title !== 'Scan collect QR' && (
                <AirKeyButton
                  text={showNfc ? 'Scan QR' : 'Scan NFC'}
                  buttonStyle={styles.toggleButton}
                  onPress={() => {
                    if (showNfc) {
                      setShowNfc(false); // Switch to QR code scanning
                    } else {
                      toggleNfc(); // Start NFC scanning
                    }
                  }}
                />
              )}
            {/* </View> */}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    margin: 0,
  },
  contentPosition: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  modalContainer: {
    paddingHorizontal: wp(3),
    paddingTop: hp(5),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraPortion: {
    height: hp(30),
    width: wp(82),
    alignSelf: 'center',
    marginTop: hp(5),
  },
  text: {
    fontSize: 17,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 20.4,
    fontFamily: fonts.urbanistSemiBold,
  },
  qrCodeText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: fonts.urbanistBold,
    borderWidth: 1,
    borderColor: Colors.grey,
    alignSelf: 'center',
    paddingVertical: hp(0.8),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    marginTop: hp(13),
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    marginTop: hp(2),
    height: hp(100),
  },
  enterCodeText: {
    fontSize: 18,
    color: Colors.white,
    letterSpacing: 0.7,
    lineHeight: 21.6,
    textAlign: 'center',
    marginTop: hp(8),
    fontFamily: fonts.urbanistSemiBold,
  },
  input: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: fonts.urbanistSemiBold,
    letterSpacing: 0.7,
    lineHeight: 20.4,
    marginHorizontal: hp(2),
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginTop: hp(1.5),
  },
  submitButton: {
    marginTop: hp(3.5),
  },
  footer: {
    marginHorizontal: hp(1.9),
  },
  nfcView: {
    flex: 1,
    height: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nfcText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: hp(2),
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: Colors.grey,
  },
  errorMessage: {
    color: Colors.error_red,
    fontSize: 13,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
    textAlign: 'center',
  },
  iconView: {
    height: hp(4),
    width: hp(4),
  },
});

export default KeyModalQr;
