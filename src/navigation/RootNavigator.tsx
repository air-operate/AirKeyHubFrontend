import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthContext } from "src/typings/global/authContext";
import RouteNames, { AuthStack, UnAuthStack } from "./RouteNames";
import {
  getAuthToken,
  getUserDetails,
  removeAuthToken,
  removeUserDetails,
} from "src/asyncstorage";
import Colors from "@assets/colors/Colors";
import { RoleContext } from "src/typings/global/roleContext";
import HostStack from "./stack/HostStack";
import { useAppDispatch } from "src/redux/hooks";
import { logOutUser } from "src/redux/actions/logout";
import { EventRegister } from "react-native-event-listeners";
import { reduxReset } from "src/redux/actions/reduxReset";
import { useNavigation } from "@react-navigation/native";
import { usePushNotifications } from "src/hooks/use-push-notifications.hook";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuth, setAuth } = React.useContext(AuthContext);
  const { role, setRole } = React.useContext(RoleContext);
  const dispatch = useAppDispatch();
  const naviagiton = useNavigation();
  const { initNotificationListeners } = usePushNotifications();

  React.useEffect(() => {
    console.log('Notification:');
    initNotificationListeners((notification) => {
      console.log('Notification received:', notification);
      setTimeout(() => {
        // Navigate only if navigation is ready
        naviagiton.navigate(RouteNames.notificationPage.name);
      }, 1000); // You can fine-tune this delay
    });
  }, [initNotificationListeners]);
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  EventRegister.addEventListener("tokenExpires", async (data) => {
    if (data) {
      signOutClick();
    }
  });

  function signOutClick() {
    dispatch(logOutUser(role));
    dispatch(reduxReset());
    removeAuthToken();
    removeUserDetails();
    setAuth(false);
  }

  const checkAuthentication = async () => {
    try {
      const data = await getAuthToken();
      if (data) {
        const userInfo = await getUserDetails();
        if (userInfo) {
          setRole(userInfo?.role ?? "");
        }
        setTimeout(() => {
          setAuth(true);
        }, 1000);
      } else {
        setAuth(false);
      }
    } catch (error) {}
  };

  const UnAuthScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={UnAuthStack.name}
          component={UnAuthStack.component}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const AuthScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={AuthStack.name}
          component={AuthStack.component}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  // Once loading is complete, render the appropriate screen based on authentication status
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: Colors.white,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Root"
        component={
          isAuth ? (role === "OWNER" ? AuthScreen : HostStack) : UnAuthScreen
        }
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
