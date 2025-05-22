import Colors from '@assets/colors/Colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomModal from '../atom/CustomModal';
import { fonts } from '@assets/fonts';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { AirKeyButton } from '../atom/airKeyButton';
import { translate } from '@translations/translate';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type props = {
  modalVisibility?: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  onPress?: (params: any) => void;
  keyDetail?: {
    box_id: string;
    key_slot_location: number;
    key_id: string;
    _id: string;
    key_status: number;
  };
  closeAllModal?: () => void;
};

const ReportKeyModal = ({
  modalVisibility,
  onPress,
  setModalVisibility,
  closeAllModal
}: props) => {
  const closeModal = () => {
    closeAllModal && closeAllModal();
    setModalVisibility(false);
  };

  const initialForm = {
    title: '',
    description: '',
  };
  const [form, setForm] = React.useState(initialForm);

  const [formError, setFormError] = React.useState({
    ...initialForm,
  });

  function onPressSubmit() {
    if (form.title == '' || form.description == '') {
      if (form.title == '' && form.description == '') {
        setFormError({
          title: translate('addKeyName'),
          description: translate('addKeyDesc'),
        });
      } else {
        if (form.title == '') {
          setFormError({ description: '', title: translate('addKeyName') });
        } else if (form.description == '') {
          setFormError({ title: '', description: translate('addKeyDesc') });
        }
      }
    } else {
      setFormError({ ...initialForm });
      onPress && onPress(form);
    }
  }

  const [keyboard, setKeyboard] = useState(0);

  useEffect(() => {
    setKeyboard(0);
    return () => {
      setKeyboard(0);
    };
  }, [modalVisibility]);

  return (
    <CustomModal visible={modalVisibility} closeModal={closeModal}>
        <View
          // contentContainerStyle={{
          //   marginBottom: keyboard,
          //   marginTop: 20,
          // }}
          // onKeyboardDidShow={() => {
          //   setKeyboard(0);
          // }}
          // onKeyboardDidHide={() => {
          //   setKeyboard(0);
          // }}
        >
          <Text style={styles.titleText}>{translate('enterTitle')}</Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            style={styles.input}
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
            returnKeyType='done'
          />
          <Text style={styles.errorText}>{formError.title}</Text>
          <Text style={styles.descriptionText}>
            {translate('enterDescription')}
          </Text>
          <TextInput
            placeholderTextColor={Colors.grey}
            style={styles.input}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            returnKeyType='done'
          />
          <Text style={styles.errorText}>{formError.description}</Text>
          <View style={styles.footer}>
            <AirKeyButton
              text={translate('submit')}
              buttonStyle={styles.submitButton}
              onPress={onPressSubmit}
            />
          </View>
        </View>
    </CustomModal>
  );
};

export default ReportKeyModal;

const styles = StyleSheet.create({
  titleText: {
    color: Colors.black,
    fontSize: 20,
    marginTop: 5,
    fontFamily: fonts.urbanistBold,
    paddingVertical: hp(3),
  },
  descriptionText: {
    color: Colors.black,
    fontSize: 20,
    marginTop: 2,
    fontFamily: fonts.urbanistBold,
    paddingVertical: hp(3),
  },
  input: {
    color: Colors.black,
    fontSize: 17,
    fontFamily: fonts.urbanistSemiBold,
    lineHeight: 20.4,
    borderBottomColor: Colors.colorBlack,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  footer: {
    marginHorizontal: hp(1.9),
  },
  submitButton: {
    marginTop: hp(3.5),
  },
  errorText: {
    color: Colors.error_red,
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 7,
    fontFamily: fonts.urbanistItalic,
  },
});
