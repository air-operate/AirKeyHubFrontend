import React, { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import IMAGES from "../../../assets/images";
import RouteNames from "@routeNames";
import { styles } from "./Styles";
import { AuthContext } from "src/typings/global/authContext";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = ({}: any) => {
  const navigation = useNavigation();
  const { isAuth } = React.useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            // Navigate to the home page if authenticated, otherwise, navigate to the login page
            name: isAuth ? RouteNames.homePage.name : RouteNames.loginPage.name,
          },
        ],
      });
    }, 2000); // 2000 milliseconds (2 seconds)
  }, [navigation]); // The effect depends on the navigation object

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.splash_logo}
        style={styles.logo}
      ></ImageBackground>
    </View>
  );
};

export default SplashScreen;
