import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RouteNames from "../RouteNames";
import Colors from "../../assets/colors/Colors";
import { styles } from "./Styles";
import {
  ActiveKeyHost,
  KeyCatalogs,
  KeyCatalog,
  Settings,
  KeyHost,
  ActiveSettings,
} from "@assets/images/indexes";
import { fonts } from "@assets/fonts";

const Tab = createMaterialTopTabNavigator();
const RootTabs = () => {
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
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name="Screen1"
        component={RouteNames.homePage.component}
        options={{
          tabBarLabel: "Key Catalog",
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
        name="Screen2"
        component={RouteNames.KeyHostListingTabPage.component}
        options={{
          tabBarLabel: "Key host",
          tabBarLabelStyle: {
            fontSize: 11,
            color: Colors.white,
            fontFamily: fonts.urbanistBold,
            textTransform: "none",
          },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <ActiveKeyHost width="25" height="25" />
              ) : (
                <KeyHost width="25" height="25" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Screen3"
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

export default RootTabs;
