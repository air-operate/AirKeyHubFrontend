import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Styles";
import AirKeyHeader from "../../../components/atom/AirKeyHeader";
import { AirKeyButton } from "../../../components/atom/airKeyButton";
import { translate } from "@translations/translate";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { resetPassword } from "src/redux/actions/forgotPassword";
import { validateForm } from "./validation";
import RouteNames from "@routeNames";
import { Loader } from "src/components/loader/loader";
import FloatingLabelInput from "src/components/inputs/floatInputLabel";

interface formType {
  password?: string;
  confirmPassword?: string;
}
const ConfirmPasswordScreen = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { Email } = props.route.params;
  const [form, setForm] = React.useState<formType>();
  const [formError, setFormError] = React.useState<formType>();
  const [password, setPassword] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState(true);
  const { error, loading, response } = useAppSelector(
    (state) => state.forgotPassword
  );
  React.useEffect(() => {
    if (response) {
      // navigate to the login page
      navigation.navigate(RouteNames.loginPage.name);
    }
    if (error) {
    }
  }, [response, error]);

  function submit() {
    // Validate the form fields
    let newError = validateForm({ ...form });
    // Set form errors based on validation results
    setFormError(newError);
    // Check if the form is valid (no errors)
    const isFormValid = Object.values(newError).every((error) => !error);
    if (isFormValid) {
      // If the form is valid, construct parameters for resetting the password
      const params = {
        email: Email, // Assuming Email is a variable holding the email address
        password: form?.password, // Assuming form contains the new password
      };
      // Dispatch an action to reset the password
      dispatch(resetPassword(params));
    } else {
      // Handle the case when the form is not valid (optional)
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
            <View style={styles.centerSection}>
              <AirKeyHeader onPressBack={() => navigation.goBack()} />
              <View style={styles.innerView}>
                <Text style={styles.newPasswordText}>
                  {translate("newPassword")}
                </Text>
              </View>
              <View style={styles.centerView}>
                <FloatingLabelInput
                  icon
                  label={translate("password")}
                  value={form?.password}
                  onChange={(text) =>
                    setForm({ ...form, password: text.toString() })
                  }
                  error={formError?.password}
                  onPressIcon={() => setPassword(!password)}
                  secureTextEntry={password}
                />
                <FloatingLabelInput
                  icon
                  label={translate("confirmPassword")}
                  value={form?.confirmPassword}
                  onChange={(text) =>
                    setForm({ ...form, confirmPassword: text.toString() })
                  }
                  error={formError?.confirmPassword}
                  onPressIcon={() => setConfirmPassword(!confirmPassword)}
                  secureTextEntry={confirmPassword}
                />
              </View>
              <AirKeyButton
                text={translate("submit")}
                buttonStyle={styles.submitButton}
                onPress={() => submit()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPasswordScreen;
