import { createStackNavigator } from "@react-navigation/stack";
import RouteNames from "@routeNames";
import React from "react";
import HostRootTabs from "../tabs/HostRootTab";

const Stack = createStackNavigator();
const HostStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={RouteNames.HostHomeScreen.name}
        component={HostRootTabs}
      />
      <Stack.Screen
        name={RouteNames.customerProfilePage.name}
        component={RouteNames.customerProfilePage.component}
      />
      <Stack.Screen
        name={RouteNames.subscriptionPlanPage.name}
        component={RouteNames.subscriptionPlanPage.component}
      />
      <Stack.Screen
        name={RouteNames.addKeyPage.name}
        component={RouteNames.addKeyPage.component}
      />
      <Stack.Screen
        name={RouteNames.keyHostListingPage.name}
        component={RouteNames.keyHostListingPage.component}
      />
      <Stack.Screen
        name={RouteNames.keyDetailPage.name}
        component={RouteNames.keyDetailPage.component}
      />
      <Stack.Screen
        name={RouteNames.UpdateKeyScreen.name}
        component={RouteNames.UpdateKeyScreen.component}
      />
      <Stack.Screen
        name={RouteNames.settingPage.name}
        component={RouteNames.settingPage.component}
      />
      <Stack.Screen
        name={RouteNames.changePasswordPage.name}
        component={RouteNames.changePasswordPage.component}
      />
      <Stack.Screen
        name={RouteNames.termsConditionPage.name}
        component={RouteNames.termsConditionPage.component}
      />
      <Stack.Screen
        name={RouteNames.privacyPage.name}
        component={RouteNames.privacyPage.component}
      />
      <Stack.Screen
        name={RouteNames.contactUsPage.name}
        component={RouteNames.contactUsPage.component}
      />
      <Stack.Screen
        name={RouteNames.notificationPage.name}
        component={RouteNames.notificationPage.component}
      />
      <Stack.Screen
        name={RouteNames.KeyHostListingTabPage.name}
        component={RouteNames.KeyHostListingTabPage.component}
      />
      <Stack.Screen
        name={RouteNames.payNowPage.name}
        component={RouteNames.payNowPage.component}
      />
      <Stack.Screen
        name={RouteNames.historyScreen.name}
        component={RouteNames.historyScreen.component}
      />
      <Stack.Screen
        name={RouteNames.hostProfile.name}
        component={RouteNames.hostProfile.component}
      />
    </Stack.Navigator>
  );
};

export default HostStack;
