// 04186
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AirKeyHeader from "../../../components/atom/AirKeyHeader";
import RouteNames from "@routeNames";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { AirKeyButton } from "../../../components/atom/airKeyButton";
import { translate } from "@translations/translate";
import { styles } from "./Styles";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import Colors from "@assets/colors/Colors";
import { verifyOtp } from "src/redux/actions/verifyOtp";
import { IVerifyOtpForm } from "@interfaces/IVerifyOtpForm";
import { Loader } from "src/components/loader/loader";
import { resendOtp } from "src/redux/actions/resendOtp";
import { resendOtpStateReset } from "src/redux/slices/resendOtp";
import { verifyOtpStateReset } from "src/redux/slices/verifyOtp";
import { ownerStateReset } from "src/redux/slices/owner";
import { setAuthToken, setUserDetails } from "src/asyncstorage";
import { AuthContext } from "src/typings/global/authContext";
import { RoleContext } from "src/typings/global/roleContext";

const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const OTPVerificationScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const { navigation } = props;
  const { setAuth } = useContext(AuthContext);
  const { setRole } = useContext(RoleContext);
  const { Email, type, countryCode } = props.route.params;

  const [value, setValue] = React.useState("");
  const [errorStrign, setError] = React.useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });

  const { response: signupRes } = useAppSelector(
    (state) => state.ownerRegister
  );
  const { response: resendOtpResp } = useAppSelector(
    (state) => state.resendOTP
  );
  const [param, setParam] = useState<IVerifyOtpForm>({
    currentOtp: "",
    email: Email.toString(),
    otpSent: signupRes?.data?.otp,
    time: signupRes?.data?.time,
  });

  const [prop] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timeLeft, setTimeLeft] = React.useState(60);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  const { error, loading, response } = useAppSelector(
    (state) => state.verifyOtp
  );

  useEffect(() => {
    if (resendOtpResp) {
      const { otp, time } = resendOtpResp.data; // Destructure data for clarity
      setParam({
        email: Email.toString(),
        otpSent: otp,
        time: time,
      });
    }
    // Reset resend OTP state
    dispatch(resendOtpStateReset());
    // Clean up function to reset owner state
    return () => {
      dispatch(ownerStateReset());
    };
  }, [resendOtpResp]);

  useEffect(() => {
    if (response) {
      if (type == "1") {
        navigation.navigate(RouteNames.loginPage.name);
      } else {
        navigation.navigate(RouteNames.confirmPasswordPage.name, {
          Email: Email,
        });
      }
    }
    if (error) {
      setError(true);
    }
    dispatch(verifyOtpStateReset());
  }, [response, error]);

  function checkVerifiedOtp() {
    // Construct parameters for OTP verification
    const otpVerificationParams: IVerifyOtpForm = {
      ...param,
      currentOtp: value,
      type: type,
    };
    // Dispatch OTP verification action
    dispatch(verifyOtp(otpVerificationParams));
  }

  function resendOtpRequest() {
    // Reset time left for OTP resend to 60 seconds
    setTimeLeft(60);
    // Reset error state
    setError(false);
    // Reset input value
    setValue("");
    // Dispatch OTP resend action
    dispatch(resendOtp({ email: Email.toString(), type: type }));
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
            <Text style={styles.verificationText}>
              {translate("verification")}
            </Text>
          </View>
          <Text style={styles.enterOtpText}>{translate("enterOTP")}</Text>
          <View style={styles.centerView}>
            <Text style={styles.descriptionText}>
              {translate("enterOtpMessage")}
            </Text>
            <Text style={[styles.descriptionText]}>
              {translate("enterOtpMessageEmail")}
            </Text>
          </View>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            keyboardType="number-pad"
            returnKeyType="done"
            blurOnSubmit
            renderCell={({ index, symbol, isFocused }) => {
              return (
                <View style={styles.codeFieldView}>
                  <Text style={styles.codeTextStyle} key={index}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              );
            }}
          />
          {errorStrign && (
            <Text style={styles.error}>{translate("inValidOTP")}</Text>
          )}
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.verificationDescription}>
            {translate("sendVerificationMessage")}{" "}
            <Text style={styles.color}>{Email.toString()}</Text>
            {translate("verificationMessage")}{" "}
          </Text>
          {timeLeft === 0 && (
            <TouchableOpacity onPress={resendOtpRequest}>
              <Text style={styles.sendAgainText}>
                {translate("doNotSendMessage")}
              </Text>
            </TouchableOpacity>
          )}
          <AirKeyButton
            text={translate("verify")}
            buttonStyle={[
              styles.verifyButton,
              {
                backgroundColor:
                  value.length == 6 ? Colors.primary_color : "gray",
              },
            ]}
            onPress={checkVerifiedOtp}
            disable={value.length == 6 ? false : true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
