import React, { useEffect, useState, useMemo, useCallback } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AirKeyButton } from "src/components/atom/airKeyButton";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import FloatingLabelInput from "src/components/inputs/floatInputLabel";
import { validateForm } from "./validation";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { changePassword } from "src/redux/actions/changePassword";
import { Loader } from "src/components/loader/loader";
import { changePasswordStateReset } from "src/redux/slices/changePassword";
import { styles } from "./Styles";
import { translate } from "@translations/translate";
import RouteNames from "@routeNames";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { error, loading, response } = useAppSelector(
    (state) => state.changePass
  );
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [formError, setFormErorr] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(true);
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);

  useEffect(() => {
    if (error) {
      // navigation.navigate(RouteNames.customerProfilePage.name)
    }
    if (response) {
      navigation.navigate(RouteNames.customerProfilePage.name);
      dispatch(changePasswordStateReset());
    }
  }, [error, response]);

  // Memoize the validation function
  const validateFormCallback = useCallback(() => validateForm(form), [form]);
  const validationErrors = useMemo(validateFormCallback, [
    validateFormCallback,
  ]);

  function savePassword() {
    // Use the memoized validation function
    const newFormError = validationErrors;
    setFormErorr(newFormError);

    const isFormValid = Object.values(newFormError).every((error) => !error);
    if (isFormValid) {
      const params = {
        old_password: form.old_password,
        new_password: form.new_password,
      };

      dispatch(changePassword(params));
    }
  }

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
              text={translate("changePassword")}
              onPressBack={navigation.goBack}
            />
            <View style={styles.centerSection}>
              <FloatingLabelInput
                label={translate("currentPassword")}
                value={form.old_password}
                secureTextEntry={currentPasswordVisible}
                icon
                onPressIcon={() =>
                  setCurrentPasswordVisible(!currentPasswordVisible)
                }
                onChange={(text) => setForm({ ...form, old_password: text })}
                error={formError.old_password}
              />
              <FloatingLabelInput
                label={translate("newPassword")}
                value={form.new_password}
                secureTextEntry={newPasswordVisible}
                icon
                onPressIcon={() => setNewPasswordVisible(!newPasswordVisible)}
                onChange={(text) => setForm({ ...form, new_password: text })}
                error={formError.new_password}
              />
              <FloatingLabelInput
                label={translate("confirmPassword")}
                value={form.confirm_password}
                secureTextEntry={confirmPasswordVisible}
                icon
                onPressIcon={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                onChange={(text) =>
                  setForm({ ...form, confirm_password: text })
                }
                error={formError.confirm_password}
              />
            </View>
            <AirKeyButton
              buttonStyle={styles.saveButton}
              text={translate("save")}
              onPress={savePassword}
            />
            {error && <Text style={styles.errorMessage}>{error.data}</Text>}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
