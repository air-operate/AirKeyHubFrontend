import axios from "axios";
import { EventRegister } from "react-native-event-listeners";
import { Alert } from "react-native";

let alertShown = false;

const axiosTokenInstance = axios.create({
  baseURL: "",
});

axiosTokenInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosTokenInstance.interceptors.response.use(
  async (response) => {
    alertShown = false;
    return response;
  },
  (error) => {
    if (error.response.status === 401 && !alertShown) {
      // Set alertShown to true to prevent multiple alerts
      alertShown = true;
      Alert.alert("Session Expired", "Please login again.", [
        { onPress: () => EventRegister.emit("tokenExpires", true) },
      ]);
    }
    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
