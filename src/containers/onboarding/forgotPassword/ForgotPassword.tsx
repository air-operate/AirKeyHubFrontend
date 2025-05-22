import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./Styles";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { resendOtp } from "src/redux/actions/resendOtp";
import { resendOtpStateReset } from "src/redux/slices/resendOtp";
import { Loader } from "src/components/loader/loader";
import FloatingLabelInput from "src/components/inputs/floatInputLabel";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import { AirKeyButton } from "src/components/atom/airKeyButton";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const disptach = useAppDispatch();
  const {
    response: resendOtpResp,
    error,
    loading,
  } = useAppSelector((state) => state.resendOTP);

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  React.useEffect(() => {
    if (resendOtpResp) {
      // If OTP resend response is received, navigate to OTP page
      navigation.navigate(RouteNames.otpPage.name, { Email: email, type: "2", countryCode: null });
      // Clear email error
      setEmailError("");
    }

    if (error) {
      // If there's an error, set email error message and reset resend OTP state
      setEmailError(translate("notFound"));
      disptach(resendOtpStateReset());
    }
  }, [resendOtpResp, error]);

  function sendForgotPassOtp() {
    // Regular expression to validate email format
    // var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Check if the email format is valid
    if (!email) {
      // If email format is invalid, set email error
      setEmailError(translate("enterValidEmail"));
    } else {
      // If email format is valid, dispatch action to resend OTP
      const params = {
        email: email,
        type: "2",
      };
      disptach(resendOtp(params));
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.centerSection}>
            <AirKeyHeader onPressBack={() => navigation.goBack()} />
            <Text style={styles.forgotPasswordText}>
              {translate("forgotPassword")}
            </Text>
            <View style={styles.centerSection}>
              <FloatingLabelInput
                label={translate("enterEmailAddress")}
                value={email}
                onChange={(e) => setEmail(e.toString())}
                keyboardType={"email-address"}
                autoCapitalize="none"
                error={emailError}
              />
            </View>
            <AirKeyButton
              text={translate("forgotPassword")}
              onPress={() => sendForgotPassOtp()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
