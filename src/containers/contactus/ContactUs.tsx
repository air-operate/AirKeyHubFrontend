import IMAGES from '@assets/images';
import { Left_Direction } from '@assets/images/indexes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { translate } from '@translations/translate';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'src/components/atom/input';
import { contactUs } from 'src/redux/actions/contactUs';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { styles } from './Styles';
import { validateContactUsForm } from './validation';
import { contactUsStateReset } from 'src/redux/slices/contactUs';
import { Loader } from 'src/components/loader/loader';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { response, loading, error } = useAppSelector(
    (state) => state.contactUs
  );
  const [form, setForm] = useState({
    description: '',
  });
  const [formError, setFormError] = useState({
    description: '',
  });

  // Memoize the validation function
  const validateFormCallback = useCallback(
    () => validateContactUsForm({ ...form }),
    [form]
  );
  const validationErrors = useMemo(validateFormCallback, [
    validateFormCallback,
  ]);

  useEffect(() => {
    if (response?.statusCode === 200) {
      navigation.goBack();
      dispatch(contactUsStateReset());
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      dispatch(contactUsStateReset());
    }, [])
  );

  const submitFunctionCallback = useCallback(() => {
    if (form.description.trim()) {
      const params = {
        description: form.description,
      };
      dispatch(contactUs(params));
    } else {
      setFormError({ description: 'Please enter description' });
    }
  }, [form, dispatch, validationErrors]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View>
            <ImageBackground style={styles.logo} source={IMAGES.contact_Logo}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={navigation.goBack}
              >
                <Left_Direction />
              </TouchableOpacity>
            </ImageBackground>
            <View style={styles.centerSection}>
              <Text style={styles.text}>{translate('getInTouch')}</Text>
              <Input
                placeHolder={translate('description')}
                parentViewStyle={styles.input}
                value={form.description}
                onChange={(text: string | any): void => {
                  setForm({
                    ...form,
                    description: text,
                  });
                }}
                error={formError.description}
                multiline
              />
              {/* {formError.description && (
                <Text style={styles.errorText}>{formError.description}</Text>
              )} */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={submitFunctionCallback}
              >
                <Text style={styles.submitText}>{translate('submit')}</Text>
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error?.data}</Text>}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
