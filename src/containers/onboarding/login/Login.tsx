import { ISignInForm } from "@interfaces/ISignInForm";
import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { setAuthToken, setUserDetails, storeData } from "src/asyncstorage";
import FloatingLabelInput from "src/components/inputs/floatInputLabel";
import { Loader } from "src/components/loader/loader";
import { signInRequest } from "src/redux/actions/SignIn";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { signInUserStateReset } from "src/redux/slices/SignIn";
import { AuthContext } from "src/typings/global/authContext";
import { AirKeyButton } from "../../../components/atom/airKeyButton";
import { styles } from "./Styles";
import { ISigninFormValidationErrors, validateSignInForm } from "./Validation";
import { RoleContext } from "src/typings/global/roleContext";
import { useFocusEffect } from "@react-navigation/native";
import { usePushNotifications } from "src/hooks/use-push-notifications.hook";
import NetInfo from "@react-native-community/netinfo";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { setAuth } = React.useContext(AuthContext);
  const { setRole } = React.useContext(RoleContext);
  const notification = usePushNotifications();
  // Initial form state
  const initialForm = { email: "", password: "" };
  const [password, setPassword] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] =
    useState<ISigninFormValidationErrors>(initialForm);
  const {
    error,
    loading,
    response: signInResp,
  } = useAppSelector((state) => state.signIn);

  useFocusEffect(
    useCallback(() => {
      dispatch(signInUserStateReset());
      setFormError(initialForm);
      setForm(initialForm);
    }, [])
  );

  React.useEffect(() => {
    if (signInResp) {
      console.log({ signInResp });
      if (signInResp.status) {
        // If sign-in is successful
        const { data } = signInResp;
        setAuthToken(data?.token);
        storeData("Notification", data.notificationStatus ? "true" : "false");
        setUserDetails(data || {});
        setAuth(true);
        setRole(data.role);
        const destination =
          data.role === "OWNER"
            ? RouteNames.homePage.name
            : RouteNames.HostHomeScreen.name;
        navigation.navigate(destination);
        dispatch(signInUserStateReset());
      } else {
        // If sign-in is unsuccessful, navigate to OTP page
        navigation.navigate(RouteNames.otpPage.name, {
          Email: form.email,
          type: "1",
          countryCode: null,
        });
      }
    }
  }, [signInResp, error]);

  // async function validateForm() {
  //   // Validate the form fields
  //   let newFormError: any = validateSignInForm(form) || {}; // Ensure it's always an object
  //   if (newFormError === null || newFormError === undefined) {
  //     newFormError = {};
  //   }
  
  //   if (Object.keys(newFormError).length === 0) {
  //     setFormError({});
  //     // Get notification token
  //     const token = await notification.getNotificationToken();
  //     // Prepare sign-in parameters
  //     const signInParams = {
  //       email: form.email,
  //       password: form.password,
  //       fcmKey: token,
  //     };
  //     // Dispatch sign-in request
  //     dispatch(signInRequest(signInParams));
  //   } else {
  //     setFormError(newFormError);
  //   }
  // }  

  // async function validateForm() {
  //   try {
  //     // Validate the form fields
  //     // let newFormError: any = validateSignInForm(form) || {}; // Ensure it's always an object
  //     // if (newFormError === null || newFormError === undefined) {
  //     //   newFormError = {};
  //     // }
  
  //     // if (Object.keys(newFormError).length > 0) {
  //     //   setFormError(newFormError);
  //     //   return; // Stop further execution if there are validation errors
  //     // }
  //     // Check network connection
  //     const networkState = await NetInfo.fetch();
  //     if (!networkState.isConnected) {
  //       Alert.alert(
  //         "No Network Connection",
  //         "Please check your internet connection and try again.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //       return; // Stop further execution if there's no network connection
  //     }
  //     // Get notification token
  //     const token = await notification.getNotificationToken();
  //     // Prepare sign-in parameters
  //     const signInParams = {
  //       email: form.email,
  //       password: form.password,
  //       fcmKey: token,
  //     };
  
  //     // Dispatch sign-in request
  //     dispatch(signInRequest(signInParams));
  //   } catch (error) {
  //     console.error("Error during form validation or sign-in", error);
  //     // Optionally, you can handle errors and show a message to the user
  //     setFormError({
  //       general: "Something went wrong, please try again later.",
  //     });
  //   }
  // }

  async function validateForm() {
    try {
      // Validate the form fields using your existing validation function
      let newFormError: any = validateSignInForm(form) || {}; // Ensure it's always an object
      if (newFormError === null || newFormError === undefined) {
        newFormError = {};
      }
      // If there are form validation errors, set the errors and stop further execution
      if (Object.keys(newFormError).length > 0) {
        setFormError(newFormError);
        return;
      }
      // Check network connection
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        Alert.alert(
          "No Network Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return; // Stop further execution if there's no network connection
      }
      // Get notification token
      const token = await notification.getNotificationToken();
      console.log("token", token);
  
      // Prepare sign-in parameters
      const signInParams = {
        email: form.email,
        password: form.password,
        fcmKey: token || "", 
      };
  
      // Dispatch sign-in request
      dispatch(signInRequest(signInParams));
  
      // Clear any previous form errors if everything is successful
      setFormError({});
    } catch (error) {
      console.error("Error during form validation or sign-in", error);
      setFormError({
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
        <Text style={styles.loginText}>{translate("login")}</Text>
        <FloatingLabelInput
          label={translate("emailAddress")}
          value={form.email}
          onChange={(text: string | any): void => {
            setForm({
              ...form,
              email: text,
            });
          }}
          error={formError?.email}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
        />
        <FloatingLabelInput
          icon
          label={translate("password")}
          value={form.password}
          onChange={(text) => setForm({ ...form, password: text.toString() })}
          error={formError?.password}
          onPressIcon={() => setPassword(!password)}
          secureTextEntry={password}
        />
        <Text style={styles.error}>{error?.data}</Text>
        {/* <AirKeyButton
          text={translate("login")}
          onPress={validateForm}
          buttonStyle={styles.loginButton}
        /> */}
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]} // Apply your styles directly
          onPress={validateForm}
          activeOpacity={0.7}
        >
           {loading ? (
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <Text style={[styles.buttonText, styles.buttonText]}>
              {translate("login")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.rememberText, styles.btnForgotPassword]}
        onPress={() => navigation.navigate(RouteNames.forgotPasswordPage.name)}
      >
        {translate("forgottenPassword")}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.haveAnText}>{translate("doNotHaveAccount")}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.registerPage.name)}
        >
          <Text style={styles.signUpText}>{translate("createAnAccount")}</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={[styles.buildVersionText]}>Build Version 1.0(5)</Text> */}
    </SafeAreaView>
  );
};

export default LoginScreen;