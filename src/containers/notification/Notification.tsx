import { useNavigation } from "@react-navigation/native";
import { translate } from "@translations/translate";
import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import NotificationList from "src/components/list/notificationlist";
import { Loader } from "src/components/loader/loader";
import { notificationListAPI } from "src/redux/actions/notificationList";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { styles } from "./Styles";
import { unreadCountAPI } from "src/redux/actions/unreadCount";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { response, loading, error } = useAppSelector(
    (state) => state.notificationList
  );

  React.useEffect(() => {
    if (response) {
      dispatch(unreadCountAPI());
    }
  }, [response]);

  useEffect(() => {
    dispatch(notificationListAPI());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.header}>
        <AirKeyHeader
          text={translate("notification")}
          onPressBack={() => {
            navigation.goBack();
          }}
        />
      </View>
      {response?.data?.length ? (
        <NotificationList data={response?.data.slice().reverse()} />
      ) : (
        <Text style={styles.alertStyle}>No Notifications</Text>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
