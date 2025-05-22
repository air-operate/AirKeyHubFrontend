import { useNavigation } from "@react-navigation/native";
import { translate } from "@translations/translate";
import React, { useEffect, useCallback } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import HistoryItem from "src/components/list/HistoryItem";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { getOwnerHistories } from "src/redux/actions/getOwnerHistory";
import { OwnHistoryData } from "@interfaces/IGetOwnHistory";
import { styles } from "./Styles";
import { Loader } from "src/components/loader/loader";
import CodeCollectionList from "src/components/list/CodeCollectionList";

const History = ({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { keyDetail } = route.params;
  const { response, loading } = useAppSelector(
    (state) => state.getOwnerHistory
  );
  const { loading: codeExpireLoading, response: codeExpireResp } =
    useAppSelector((state) => state.expireCode);

  useEffect(() => {
    dispatch(getOwnerHistories({ keyId: keyDetail._id }));
  }, [dispatch, keyDetail._id, codeExpireResp]);

  function extractDateTime(timestamp: number) {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp * 1000);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format the date and time as desired
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate}, ${formattedTime}`;
  }

  const renderItem = useCallback(
    ({ item }: { item: OwnHistoryData }) => {
      if (item.code_number == 0) {
        return null;
      }
      return (
        <View style={styles.listContainer}>
          <CodeCollectionList
            label={item.tag ? item.tag.toString() : ""}
            labelStyle={styles.headerStyle}
          />
          <CodeCollectionList
            label={translate("codeNumber")}
            value={item.code_number.toString()}
          />
          {item.key_collected_date !== null && (
            <CodeCollectionList
              label={translate("keyCollected")}
              value={extractDateTime(item.key_collected_date)}
            />
          )}
          {item.key_returned_date !== null && (
            <CodeCollectionList
              label={translate("keyReturn")}
              value={extractDateTime(item.key_returned_date)}
            />
          )}
        </View>
      );
    },
    [extractDateTime]
  );

  if (loading || codeExpireLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.header}>
            <AirKeyHeader
              text={translate("history")}
              onPressBack={() => navigation.goBack()}
            />
            {response?.data.length ? (
              <FlatList
                data={response?.data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.listStyle}
                inverted
              />
            ) : (
              <Text style={styles.textStyle}>{translate("noHistory")}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default History;
