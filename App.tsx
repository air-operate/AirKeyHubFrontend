import Colors from "@assets/colors/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { Alert, Platform, StatusBar } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Provider } from "react-redux";
import { BASE_URL, GET_PLANS_URL } from "src/api/endpoints/endpoints";
import { getAuthToken } from "src/asyncstorage";
import useInternetConnection from "src/hooks/useInternetConnection";
import RootNavigator from "src/navigation/RootNavigator";
import AuthProvider from "src/providers/authProvider";
import NotificationProvider from "src/providers/NotificationProvider";
import RoleProvider from "src/providers/roleProvider";
import { store } from "src/redux/store";
import axiosTokenInstance from "src/service/network/axios";

const App = () => {
  useInternetConnection();
  const isConnected = useInternetConnection();
  const [stripeKey, setStripeKeys] = React.useState(
    "pk_live_51Q3LalHbgDUtS1J3ETs6hYorgss6gso6Ev1Ipwo3hHeu2ALwW5Nv1byFa7KSFBE9o0fQnMOjz0Uv78cViY1yBngi000SQf5ZiL"
  );

  const [token, setToken] = React.useState("");
  const [isTokenLoaded, setIsTokenLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadToken = async () => {
      const authToken = await getAuthToken(); // Get token from async storage
      if (authToken) {
        setToken(authToken); // Set token in state
        setIsTokenLoaded(true);
      } // Mark token as loaded
    };

    loadToken(); // Run the load token function on component mount
  }, []);

  React.useEffect(() => {
    if (token && isTokenLoaded) getStripeKeys();
  }, [token, isTokenLoaded]);
  React.useEffect(() => {
    if (!isConnected) {
      Alert.alert("No Internet Connection", "Please check your network.");
    }
  }, [isConnected]);


  const getStripeKeys = async () => {
    axiosTokenInstance({
      method: "GET",
      url: GET_PLANS_URL,
      params: { user_local_currency: "gbp" },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        console.log("Stripe Key:", resp.data.data.stripe_public_key);
        setStripeKeys(resp.data.data.stripe_public_key);
        console.log(resp.data, "sdfsfdsfsdfsdf");
      })
      .catch((error: any) => {
        console.log(error.response, "sdfsfdsfsdfsdf");
      });
  };

  return (
    <StripeProvider
      publishableKey={stripeKey}
      // urlScheme='airkey://'
      threeDSecureParams={{
        backgroundColor: "#FFFFFF", // iOS only
        timeout: 5,
        label: {
          headingTextColor: "#000000",
          headingFontSize: 13,
        },
        navigationBar: {
          headerText: "3d secure",
        },
        footer: {
          // iOS only
          backgroundColor: "#FFFFFF",
        },
        submitButton: {
          backgroundColor: "#000000",
          // cornerRadius: 12,
          textColor: "#FFFFFF",
          textFontSize: 14,
        },
      }}
    >
      <Provider store={store}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.primary_color}
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <AuthProvider>
          <RoleProvider>
            <NavigationContainer>
              <NotificationProvider>
                <RootNavigator />
                <Toast />
                {/* <NetworkLogDebugModal /> */}
              </NotificationProvider>
            </NavigationContainer>
          </RoleProvider>
        </AuthProvider>
      </Provider>
    </StripeProvider>
  );
};

export default App;
