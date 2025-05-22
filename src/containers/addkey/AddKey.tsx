import { Right_Arrow } from '@assets/images/indexes';
import RouteNames from '@routeNames';
import { translate } from '@translations/translate';
import React, { useCallback } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirKeyButton } from 'src/components/atom/airKeyButton';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import KeyHostDetail from 'src/components/details/keyhostdetail';
import AddKeyInput from 'src/components/inputs/addKeyInput';
import { styles } from './Styles';
import { IAddKeyValidationErrors, validateAddKey } from './Validations';
import { useFocusEffect } from '@react-navigation/native';
import { useAppSelector } from 'src/redux/hooks';

const AddKeyScreen = (props: any) => {
  const { navigation } = props;
  const initialForm = {
    name: '',
    description: '',
    hostData: props.route.params ? props.route.params.hostDetail._id : '' || '',
  };

  const [form, setForm] = React.useState(initialForm);
  const { response: keyCatalogResp } = useAppSelector(
    (state) => state.getKeyCatalog
  );

  const [formError, setFormError] = React.useState<IAddKeyValidationErrors>({
    ...initialForm,
    hostData: '',
  });

  useFocusEffect(
    useCallback(() => {
      setFormError({ ...initialForm, hostData: '' });
    }, [])
  );

  const sendData = {
    hostData: props.route.params && props.route.params.hostDetail._id,
    name: form.name,
    description: form.description,
  };

  React.useEffect(() => {
    if (props.route.params && props.route.params.hostDetail._id) {
      setForm({ ...form, hostData: props.route.params.hostDetail._id });
    }
  }, [props.route.params]);

  const subscribeButton = useCallback(() => {
    let newFormError = validateAddKey(form);
    setFormError(newFormError);
    const isFormValid = Object.values(newFormError).every((error) => !error);
    if (isFormValid) {
      if (
        props.route.params &&
        props.route.params.hostDetail.availableSlots === 0
      ) {
        // Handle case where availableSlots === 0
      } else {
        const keyList = keyCatalogResp?.data.some(
          (key) => key.name === form.name
        );
        if (keyList) {
          setFormError({
            ...formError,
            name: translate('keyNameAlreadyExists'),
          });
        } else
          navigation.navigate(RouteNames.subscriptionPlanPage.name, {
            name: sendData,
            newKey: true,
          });
      }
    }
  }, [
    form,
    props.route.params,
    navigation,
    setFormError,
    validateAddKey,
    sendData,
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AirKeyHeader
            text={translate('keyAdd')}
            onPressBack={navigation.goBack}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          >
            <View style={styles.centerSection}>
              <AddKeyInput
                text={translate('name')}
                value={form.name}
                onChange={(text) => setForm({ ...form, name: text.toString() })}
                error={formError.name}
                placeHolder={translate('enterKeyName')}
              />
              <AddKeyInput
                text={translate('description')}
                textInputStyle={styles.description}
                value={form.description}
                onChange={(text) =>
                  setForm({ ...form, description: text.toString() })
                }
                error={formError.description}
                multiline
                placeHolder={translate('enterDescription')}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames?.keyHostListingPage?.name)
                }
                style={styles.selectedKeyHostButton}
              >
                <Text style={styles.selectedKey}>
                  {translate('selectKeyHost')}
                </Text>
                <Right_Arrow />
              </TouchableOpacity>
              {formError?.hostData && (
                <Text style={styles.errorMessage}>{formError?.hostData}</Text>
              )}

              {props.route.params && props.route.params.hostDetail && (
                <KeyHostDetail hostDetail={props.route.params.hostDetail} />
              )}
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.footer}>
            <AirKeyButton
              text={translate('selectSub')}
              onPress={subscribeButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddKeyScreen;
