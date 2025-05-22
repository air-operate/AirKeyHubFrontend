import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RouteNames from "../RouteNames";
import Colors from "../../assets/colors/Colors";
import { styles } from "./Styles";
import {
  ActiveSettings,
  KeyCatalog,
  KeyCatalogs,
  Settings,
} from "@assets/images/indexes";
import { fonts } from "@assets/fonts";

const Tab = createMaterialTopTabNavigator();
const HostRootTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        animationEnabled: true,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarInactiveTintColor: Colors.black,
        tabBarPressColor: Colors.app_white,
        tabBarLabel: () => null,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen
        name={RouteNames.HostHomeScreen.name}
        component={RouteNames.HostHomeScreen.component}
        options={{
          tabBarLabel: "Activity",
          tabBarLabelStyle: {
            fontSize: 11,
            color: Colors.white,
            fontFamily: fonts.urbanistBold,
            textTransform: "none",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <KeyCatalogs width="25" height="25" />
              ) : (
                <KeyCatalog width="25" height="25" />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Screen9"
        component={RouteNames.settingPage.component}
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            fontSize: 11,
            color: Colors.white,
            fontFamily: fonts.urbanistBold,
            textTransform: "none",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <ActiveSettings width="25" height="25" />
              ) : (
                <Settings width="25" height="25" />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HostRootTabs;
