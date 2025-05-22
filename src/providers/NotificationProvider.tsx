import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useCallback } from "react";
import { usePushNotifications } from "../hooks/use-push-notifications.hook";
import { useAppDispatch } from "../redux/hooks";
import { setNotification } from "../redux/slices/NotificationState";
import { unreadCountAPI } from "src/redux/actions/unreadCount";

interface Props {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<Props> = ({ children }) => {
  const pushNotifications = usePushNotifications();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const requestNotificationPermissions = useCallback(async () => {
    await pushNotifications.requestNotificationPermissions();
    const token = await pushNotifications.getNotificationToken();
    // TODO: Do something with the token
    console.log(`APNS TOKEN:\n${token}`);
  }, [pushNotifications]);

  const handleNotificationReceived = useCallback(
    (notification?: NotificationData) => {
      console.log("handleNotificationReceived", notification);
      dispatch(setNotification(true));
      dispatch(unreadCountAPI());
    },
    []
  );

  useEffect(() => {
    pushNotifications.initNotificationListeners(handleNotificationReceived);
  }, [pushNotifications, handleNotificationReceived]);

  useEffect(() => {
    pushNotifications.clearBadgeCount();
  }, [pushNotifications]);

  useEffect(() => {
    requestNotificationPermissions();
  }, [requestNotificationPermissions]);

  return <>{children}</>;
};

export default NotificationProvider;
