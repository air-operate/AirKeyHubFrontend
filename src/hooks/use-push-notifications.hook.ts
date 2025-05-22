import * as React from "react";
import notifee, {
  Event as notifeeEvent,
  EventType as notifeeEventType,
} from "@notifee/react-native";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import * as Sentry from "@sentry/react-native";
import { Platform } from "react-native";
import { setNotification } from "../redux/slices/NotificationState";
import { useAppDispatch } from "../redux/hooks";
import { storeData } from "../asyncstorage";
import RouteNames from "@routeNames";
import { useNavigation } from "@react-navigation/native";
export const isIOS = Platform.OS === "ios";

interface Options {
  initNotificationListeners: (
    callback: (notification?: NotificationData) => void
  ) => void;
  requestNotificationPermissions: () => Promise<void>;
  getNotificationToken: () => Promise<string>;
  clearBadgeCount: () => Promise<void>;
}

export const usePushNotifications = (): Options => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const registerDeviceForRemoteMessages = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log("Device registered for remote messages.");
    } catch (error) {
      console.error("Error registering for remote messages:", error);
    }
  };

  const requestNotificationPermissions = async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const getNotificationToken = async (): Promise<string | null> => {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error("Error fetching notification token:", error);
      return null;
    }
  };

  async function handleMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage
  ) {
    try {
      const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
      });

      await notifee.displayNotification({
        title: message.notification?.title || "",
        body: message.notification?.body || "",
        data: message?.data,
        android: {
          channelId,
        },
      });

      if (isIOS) {
        await notifee.cancelAllNotifications();
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  const handleBackgroundReceived = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    callback: (notification?: NotificationData) => void
  ) => {
    callback(remoteMessage?.data as unknown as NotificationData);
  };

  const handleTerminatedReceived = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
    callback: (notification?: NotificationData) => void
  ) => {
    if (remoteMessage) {
      callback(remoteMessage.data as unknown as NotificationData);
    }
  };

  const onForegroundEvent = async (
    props: notifeeEvent,
    callback: (notification?: NotificationData) => void
  ) => {
    switch (props.type) {
      case notifeeEventType.DISMISSED:
        break;
      case notifeeEventType.PRESS:
        {
          const { notification } = props.detail;
          dispatch(setNotification(true));
          navigation.navigate(RouteNames.notificationPage.name);
        }
        break;
    }
  };

  const initNotificationListeners = React.useCallback(
    (callback: () => void) => {
      notifee.onForegroundEvent((props) => {
        return onForegroundEvent(props, callback);
      });
      messaging().onMessage((message) => {
        return handleMessageReceived(message);
      });
      messaging().onNotificationOpenedApp((message) =>
        handleBackgroundReceived(message, callback)
      );
      messaging()
        .getInitialNotification()
        .then((message) => handleTerminatedReceived(message, callback));
    },
    []
  );

  const clearBadgeCount = async () => {
    await notifee.setBadgeCount(0);
  };

  return React.useMemo(
    () => ({
      registerDeviceForRemoteMessages,
      requestNotificationPermissions,
      getNotificationToken,
      initNotificationListeners,
      clearBadgeCount,
    }),
    [initNotificationListeners]
  );
};
