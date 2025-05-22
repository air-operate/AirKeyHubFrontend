import RouteNames from "@routeNames";
import React, { useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {
  CountryCode,
  TranslationLanguageCodeMap,
} from "react-native-country-picker-modal";
import { AirKeyButton } from "../../../components/atom/airKeyButton";
import { translate } from "@translations/translate";
import { styles } from "./Styles";
import { validateSignUpForm } from "./validation"; // Ensure validation is updated
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { ownerRegisterRequest } from "src/redux/actions/owner";
import { ISignUpForm } from "@interfaces/iSignUpForm";
import { Loader } from "src/components/loader/loader";
import FloatingLabelInput from "src/components/inputs/floatInputLabel";
import { useFocusEffect } from "@react-navigation/native";
import { ownerStateReset } from "src/redux/slices/owner";
import { usePushNotifications } from "src/hooks/use-push-notifications.hook";
import NetInfo from "@react-native-community/netinfo";

export interface IRegister {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country_code?: string;
  country?: string | TranslationLanguageCodeMap;
  phoneNumber?: number | string | null;
}

const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const notification = usePushNotifications();
  const { error, loading, response } = useAppSelector(
    (state) => state.ownerRegister
  );
  const [registerForm, setRegisterForm] = React.useState<IRegister>({
    country_code: "1",
  });
  const [registerFormError, setRegisterFormError] = React.useState<IRegister>({
    country_code: "1",
  });
  const [showCountryModal, setShowCountryModal] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState<CountryCode>("US");
  const [confirmPassword, setConfirmPassword] = React.useState(true);
  const [password, setPassword] = React.useState(true);

  useFocusEffect(
    useCallback(() => {
      if (error) {
        // Reset owner state if there's an error
        dispatch(ownerStateReset());
      }
      // Clear register form errors
      setRegisterFormError({});
    }, [])
  );

  React.useEffect(() => {
    if (response) {
      // Navigate to OTP page if response is received
      navigation.navigate(RouteNames.otpPage.name, {
        Email: registerForm.email,
        type: "1",
        countryCode: registerForm.country_code,
      });
    }

    if (error) {
      // Handle error if needed
    }
  }, [response, error]);

  // async function submit() {
  //   // Validate the sign-up form
  //   let newFormError: any = validateSignUpForm({ ...registerForm }) || {};

  //   if (newFormError === null || newFormError === undefined) {
  //     newFormError = {};
  //   }

  //   if (Object.keys(newFormError).length === 0) {
  //     console.log("form is valid");
  //     // Get notification token
  //     const token = await notification.getNotificationToken();

  //     // Prepare phone number (if available)
  //     const phoneNumber = registerForm.phoneNumber
  //       ? typeof registerForm.phoneNumber === 'string'
  //         ? parseInt(registerForm.phoneNumber)
  //         : registerForm.phoneNumber
  //       : undefined;

  //     // Prepare sign-up parameters
  //     const signUpParams: ISignUpForm = {
  //       countryCode: parseInt(registerForm.country_code as string),
  //       email: registerForm.email,
  //       password: registerForm.password,
  //       name: registerForm.name?.trim(),
  //       fcmKey: token,
  //       country: registerForm.country?.toString(),
  //     };

  //     // Dispatch owner registration request
  //     dispatch(ownerRegisterRequest(signUpParams));
  //   } else {
  //     setRegisterFormError(newFormError);
  //   }
  // }
  async function submit() {
    try {
      // console.log("Form submission initiated");
      // Validate the sign-up form
      let newFormError: any = validateSignUpForm({ ...registerForm }) || {};
  
      if (newFormError === null || newFormError === undefined) {
        newFormError = {};
      }
  
      if (Object.keys(newFormError).length > 0) {
        setRegisterFormError(newFormError);
        return; // Stop submission if there are validation errors
      }
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        Alert.alert(
          "No Network Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }
      // Get notification token
      const token = await notification.getNotificationToken();
  
      // Prepare phone number (if available)
      const phoneNumber = registerForm.phoneNumber
        ? typeof registerForm.phoneNumber === "string"
          ? parseInt(registerForm.phoneNumber)
          : registerForm.phoneNumber
        : undefined;
  
      // Prepare sign-up parameters
      const signUpParams: ISignUpForm = {
        countryCode: parseInt(registerForm.country_code as string),
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name?.trim(),
        fcmKey: token || "",
        country: registerForm.country?.toString(),
      };
  
      // Dispatch owner registration request
      dispatch(ownerRegisterRequest(signUpParams));
    } catch (error) {
      console.error("Error during sign-up", error);
      // Handle error if needed
      setRegisterFormError({
        general: "Something went wrong, please try again later.",
      });
    }
  }
  
  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
          automaticallyAdjustKeyboardInsets
        >
          <Text style={styles.signUpText}>{translate("signUp")}</Text>
          <FloatingLabelInput
            label={translate("name")}
            value={registerForm.name}
            onChange={(text) => {
              setRegisterForm({ ...registerForm, name: text.toString() });
            }}
            error={registerFormError.name}
            autoCapitalize="none"
          />
          <FloatingLabelInput
            value={registerForm.email}
            label={translate("emailAddress")}
            onChange={(text) => {
              setRegisterForm({ ...registerForm, email: text.toString() });
            }}
            keyboardType="email-address"
            error={registerFormError.email}
            autoCapitalize="none"
          />
          {/* <View style={{ marginTop: 20 }} /> */}
          {/* <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.inputButton}
          >
            <Text style={[registerForm.country ? styles.text : styles.labelStyle]}>
              {registerForm.country ? registerForm.country?.toString() : translate('country')}
            </Text>
          </TouchableOpacity> */}
          {/* {registerFormError.country && (
            <Text style={styles.errorMessage}>
              {registerFormError.country?.toString()}
            </Text>
          )} */}
          <FloatingLabelInput
            icon
            label={translate("password")}
            value={registerForm.password}
            onChange={(text) => {
              setRegisterForm({ ...registerForm, password: text.toString() });
            }}
            error={registerFormError.password}
            secureTextEntry={password}
            onPressIcon={() => setPassword(!password)}
          />
          <FloatingLabelInput
            icon
            label={translate("confirmPassword")}
            value={registerForm.confirmPassword}
            onChange={(text) => {
              setRegisterForm({
                ...registerForm,
                confirmPassword: text.toString(),
              });
            }}
            error={registerFormError.confirmPassword}
            secureTextEntry={confirmPassword}
            onPressIcon={() => setConfirmPassword(!confirmPassword)}
          />
          <Text style={styles.error}>{error?.data}</Text>
          {/* <AirKeyButton text={translate('signUp')} onPress={submit} /> */}
          <TouchableOpacity style={styles.buttonContainer} onPress={submit}>
            <Text style={styles.buttonText}>{translate("signUp")}</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.haveAnText}>{translate("haveAccount")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.loginPage.name)}
            >
              <Text style={styles.loginText}>{translate("login")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* <CountryPicker
        countryCode={countryCode}
        visible={modalVisible}
        withCallingCode={false}
        withFlag={true}
        withFilter
        withFlagButton={false}
        onClose={() => setModalVisible(false)}
        onSelect={(country) => {
          setModalVisible((a) => !a);
          setRegisterForm({
            ...registerForm,
            country: country.name,
            country_code: country.callingCode[0],
          });
          setCountryCode(country.cca2);
        }}
      /> */}
    </SafeAreaView>
  );
};

export default SignUpScreen;
