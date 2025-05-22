import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useEffect } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AirKeyButton } from "src/components/atom/airKeyButton";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import AddKeyInput from "src/components/inputs/addKeyInput";
import { IAddKeyValidationErrors, validateAddKey } from "./validations";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { updateKeyAPI } from "src/redux/actions/updateKey";
import { IUpdateKey } from "@interfaces/iUpdateKey";
import { updateKeyStateReset } from "src/redux/slices/updateKey";
import { getKeyCatalog } from "src/redux/actions/getKeyCatalog";
import { Loader } from "src/components/loader/loader";

const UpdateKeyScreen = (props: any) => {
  const { navigation, route } = props;
  const { keyDetail } = route.params;
  const dispatch = useAppDispatch();

  const { error, loading, response } = useAppSelector(
    (state) => state.updateKey
  );

  const initialForm = {
    name: "",
    description: "",
  };

  const [form, setForm] = React.useState(initialForm);

  const [formError, setFormError] = React.useState<IAddKeyValidationErrors>({
    ...initialForm,
  });

  useEffect(() => {
    if (route.params && keyDetail) {
      setForm({ description: keyDetail.description, name: keyDetail.name });
    }
  }, [keyDetail]);

  useEffect(() => {
    if (response?.statusCode === 200) {
      navigation.navigate(RouteNames.homePage.name);
      dispatch(getKeyCatalog());
    }
    if (error) {
      Alert.alert(error.data);
    }
    dispatch(updateKeyStateReset());
  }, [response, error]);

  const subscribeButton = () => {
    let newFormError = validateAddKey(form);
    setFormError(newFormError);
    const isFormValid = Object.values(newFormError).every((error) => !error);
    if (isFormValid) {
      const params: IUpdateKey = {
        description: form.description,
        id: keyDetail._id,
        name: form.name,
      };
      dispatch(updateKeyAPI(params));
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.header}>
            <AirKeyHeader
              text={translate("UpdateAdd")}
              onPressBack={navigation.goBack}
            />
            <View style={styles.centerSection}>
              <AddKeyInput
                text={translate("name")}
                value={form.name}
                onChange={(text) => setForm({ ...form, name: text.toString() })}
                error={formError.name}
              />

              <AddKeyInput
                text={translate("description")}
                textInputStyle={styles.description}
                value={form.description}
                onChange={(text) =>
                  setForm({ ...form, description: text.toString() })
                }
                error={formError.description}
                multiline
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <AirKeyButton text={translate("submit")} onPress={subscribeButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateKeyScreen;
