import { useNavigation } from "@react-navigation/native";
import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useCallback, useContext, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removeAuthToken, removeUserDetails } from "src/asyncstorage";
import NotificationSwitch from "src/components/buttons/notificationtoggle";
import SettingsButton from "src/components/buttons/settingsbutton";
import { logOutUser } from "src/redux/actions/logout";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { AuthContext } from "src/typings/global/authContext";
import { styles } from "./Styles";
import { RoleContext } from "src/typings/global/roleContext";
import { notificationAPI } from "src/redux/actions/notificationSetting";
import { Loader } from "src/components/loader/loader";
import { appConditionsAPI } from "src/redux/actions/appConditions";
import { reduxReset } from "src/redux/actions/reduxReset";
import { deleteAccountRequest } from "@screens/keyhostlisting/api";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { setAuth } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { loading } = useAppSelector((state) => state.notificationSettings);

  const signOutClick = useCallback(() => {
    dispatch(logOutUser(role));
    removeAuthToken();
    removeUserDetails();
    setAuth(false);
    dispatch(reduxReset());
  }, []);
  const logoutBtn = useCallback(() => {
    Alert.alert(translate("logOut"), translate("sureLogout"), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => signOutClick() },
    ]);
  }, []);

  const deleteAccount = async () => {
    setLoading(true);
    await deleteAccountRequest()
    .then(()=>{
      removeAuthToken();
      removeUserDetails();
      setAuth(false);
      dispatch(reduxReset());
    })
    .catch(()=>{})
    .finally(()=>{
      setLoading(false)
    })
  }

  const deleteAccountClick = useCallback(() => {
    Alert.alert(translate("deleteAccount"), translate("sureDeleteAccount"), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteAccount() },
    ]);
  }, [])

  const notificationSetting = useCallback((status: boolean) => {
    dispatch(notificationAPI({ status: status }));
  }, []);

  if (loading || isLoading) {
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
            <Text style={styles.title}>{translate("settings")}</Text>
            {role === "OWNER" && (
              <NotificationSwitch onPress={notificationSetting} />
            )}
            <SettingsButton
              text={translate("termsCondition")}
              onPress={() => {
                dispatch(appConditionsAPI({ type: "1" }));
                navigation.navigate(RouteNames.termsConditionPage.name);
              }}
            />
            <SettingsButton
              text={translate("privacyPolicy")}
              onPress={() => {
                dispatch(appConditionsAPI({ type: "2" }));
                navigation.navigate(RouteNames.privacyPage.name);
              }}
            />
            <SettingsButton
              text={translate("contactUs")}
              onPress={() => navigation.navigate(RouteNames.contactUsPage.name)}
            />
            <SettingsButton
              text={translate("deleteAccount")}
              onPress={() => deleteAccountClick()}
              textStyle={styles.deleteButton}
            />
            <SettingsButton text={translate("logOut")} onPress={logoutBtn} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
