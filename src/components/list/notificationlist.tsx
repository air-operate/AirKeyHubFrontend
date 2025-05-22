import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { NotificationData } from "src/typings/global";
import { fonts } from "@assets/fonts";
import { RefreshControl } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { notificationListAPI } from "src/redux/actions/notificationList";

type Props = {
  data: NotificationData[];
};
const NotificationList = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.notificationList);
  const refreshControl = () => {
    dispatch(notificationListAPI());
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.gap}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshControl} />
      }
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.message}</Text>
            </View>
            {/* <Right_Arrow /> */}
          </View>
        );
      }}
    />
  );
};

export default NotificationList;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.7),
    elevation: 3,
    marginBottom: hp(1),
    shadowColor: Colors.grey,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: hp(3),
  },
  gap: { paddingVertical: hp(2) },
  name: { fontSize: 15, color: Colors.black, fontFamily: fonts.urbanistMedium },
  description: {
    fontSize: 10,
    fontFamily: fonts.urbanistRegular,
    color: Colors.grey,
    width: wp(66),
  },
  header: { gap: 5 },
});
