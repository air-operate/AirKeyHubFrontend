import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RouteNames from "../RouteNames";

const Stack = createStackNavigator();
function UnAuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.splashPage.name}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={RouteNames.splashPage.name}
        component={RouteNames.splashPage.component}
      />
      <Stack.Screen
        name={RouteNames.loginPage.name}
        component={RouteNames.loginPage.component}
      />
      <Stack.Screen
        name={RouteNames.registerPage.name}
        component={RouteNames.registerPage.component}
      />
      <Stack.Screen
        name={RouteNames.otpPage.name}
        component={RouteNames.otpPage.component}
      />
      <Stack.Screen
        name={RouteNames.forgotPasswordPage.name}
        component={RouteNames.forgotPasswordPage.component}
      />
      <Stack.Screen
        name={RouteNames.confirmPasswordPage.name}
        component={RouteNames.confirmPasswordPage.component}
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
        name={RouteNames.homePage.name}
        component={RouteNames.homePage.component}
      />
      <Stack.Screen
        name={RouteNames.keyDetailPage.name}
        component={RouteNames.keyDetailPage.component}
      />
      <Stack.Screen
        name={RouteNames.payNowPage.name}
        component={RouteNames.payNowPage.component}
      />
    </Stack.Navigator>
  );
}

export default UnAuthStackNavigator;
