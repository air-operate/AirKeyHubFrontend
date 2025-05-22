import { Key_Add_Icon } from "@assets/images/indexes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useCallback, useState } from "react";
import {
  DeviceEventEmitter,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeHeader from "src/components/headers/homeheader";
import KeyCatalogList from "src/components/molecule/keyCatalogList";
import { getKeyCatalog } from "src/redux/actions/getKeyCatalog";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { styles } from "./Styles";
import { Loader } from "src/components/loader/loader";
import { getOwnerProfile } from "src/redux/actions/getOwnerProfile";
import { unreadCountAPI } from "src/redux/actions/unreadCount";
import { getPlans } from "src/redux/actions/getPlans";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { response: keyCatalogResp, loading } = useAppSelector(
    (state) => state.getKeyCatalog
  );
  const { loading: proofileLoading, response: profileDetail } = useAppSelector(
    (state) => state.getOnwerProfile
  );
  const { response: unreadCount } = useAppSelector(
    (state) => state.unreadCount
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(keyCatalogResp?.data);

  React.useEffect(() => {
    dispatch(getKeyCatalog());
    dispatch(getOwnerProfile());
    dispatch(unreadCountAPI());
    dispatch(getPlans());
  }, []);

  // React.useEffect(() => {
  //   const paymentConfirm = DeviceEventEmitter.addListener(
  //     "GetKeyList",
  //     (event) => {
  //       dispatch(getKeyCatalog());
  //     }
  //   );

  //   return () => {
  //     paymentConfirm.remove();
  //   };
  // }, []);

  React.useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener('GetKeyList', () => {
      console.log('Event received: Refreshing key list');
      dispatch(getKeyCatalog()); // Dispatch the action to refresh the list
    });

    return () => eventListener.remove(); // Cleanup the listener on unmount
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getKeyCatalog()); // Fetch latest data when screen is focused
    }, [])
  );
  React.useEffect(() => {
    if (keyCatalogResp) {
      setFilteredData(keyCatalogResp?.data);
    }
  }, [profileDetail, keyCatalogResp]);

  const handleSearch = (text: string) => {
    const formattedText = text.toLowerCase();
    const filtered = keyCatalogResp?.data?.filter(
      (item: { name: string; description: string }) =>
        item.name.toLowerCase().includes(formattedText)
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  const emptySearch = () => {
    setSearchText("");
    setFilteredData(keyCatalogResp?.data);
  };

  if (proofileLoading) {
    return <Loader />;
  }

  // const paymentData = useAppSelector((state) => state.getPlans.response?.data);

  // console.log(paymentData?.local_currency_price,'asdfadf');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HomeHeader
          onPressNotification={() =>
            navigation.navigate(RouteNames.notificationPage.name)
          }
          unreadCount={unreadCount?.data.unreadNotifications ?? 0}
          searchText={searchText}
          handleSearch={handleSearch}
          emptySearch={emptySearch}
        />
        <View style={styles.centerSection}>
          <Text style={styles.keyCatalog}>{translate("keyCatalog")}</Text>
          <TouchableOpacity
            style={styles.addKeysButton}
            onPress={() => navigation.navigate(RouteNames.addKeyPage.name)}
          >
            <Key_Add_Icon />
            <Text style={styles.keyAddText}>{translate("keyAdd")}</Text>
          </TouchableOpacity>
        </View>
        <KeyCatalogList
          data={filteredData ?? []}
          navigation={navigation}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
