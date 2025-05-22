import { useNavigation } from "@react-navigation/native";
import { translate } from "@translations/translate";
import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import HistoryItem from "src/components/list/HistoryItem";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import ShareQrModal from "src/components/modal/shareqrmodal";
import Share from "react-native-share";
import Colors from "@assets/colors/Colors";
import { Alert } from "react-native";
import { expireCodeAPI } from "src/redux/actions/expireCode";
import { Loader } from "src/components/loader/loader";
import { styles } from "./Styles";
import { getCodeCollection } from "src/redux/actions/getCodeCollection";
import { CodeCollectionData } from "@interfaces/ICodeCollection";
import CodeCollectionList from "src/components/list/CodeCollectionList";

const CodeCollection = ({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { keyDetail } = route.params;
  const { response, loading } = useAppSelector((state) => state.codeCollection);

  const [shareQRVisibility, setShareQRVisibility] = useState(false);
  const [collectionCode, setCollectionCode] = useState("");
  const [file, setFile] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const { loading: codeExpireLoading, response: codeExpireResp } =
    useAppSelector((state) => state.expireCode);
  useEffect(() => {
    dispatch(getCodeCollection({ keyId: keyDetail._id }));
  }, [dispatch, keyDetail._id, codeExpireResp]);

  const shareCollectionCode = useCallback(
    async (params: string) => {
      try {
        await Share.open({ url: file, title: params, message: params });
        setShareQRVisibility(false);
      } catch (error) {
        console.error("Error sharing collection code:", error);
      }
    },
    [file]
  );

  const convertTimestampToDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: CodeCollectionData }) => (
      <TouchableOpacity
        style={styles.listContainer}
        activeOpacity={item.active_status ? 0.4 : 1}
        onPress={() => {
          if (item.active_status) {
            setCollectionCode(item.code_number.toString());
            setCollectionId(item._id);
            setShareQRVisibility(true);
          }
        }}
      >
        <CodeCollectionList
          label={item.tag ? item.tag.toString() : ""}
          labelStyle={styles.headerStyle}
        />
        <CodeCollectionList
          label={translate("codeNumber")}
          value={item.code_number.toString()}
        />
        <CodeCollectionList
          label={translate("codeIssueData")}
          value={convertTimestampToDate(item.code_issue_date)}
        />
        {item.code_expiry_date !== 0 && (
          <CodeCollectionList
            label={translate("codeExpiryDate")}
            value={convertTimestampToDate(item.code_expiry_date)}
          />
        )}
        <View style={styles.divider} />
        <View style={styles.rowContainer}>
          <Text style={styles.label}>
            {item.active_status
              ? translate("codeActive")
              : translate("codeInActive")}
          </Text>
          <View
            style={[
              styles.roundIcon,
              {
                backgroundColor: item.active_status
                  ? "#50cc31"
                  : Colors.error_red,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    ),
    [convertTimestampToDate]
  );

  async function expireQRCode() {
    Alert.alert(translate("expireTitle"), translate("expireDesc"), [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setShareQRVisibility(false);
          dispatch(expireCodeAPI({ history_code_id: collectionId }));
        },
      },
    ]);
  }

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
              text={translate("collectionCode")}
              onPressBack={() => navigation.goBack()}
            />
            {response?.data.length ? (
              <FlatList
                data={response?.data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.listStyle}
              />
            ) : (
              <Text style={styles.textStyle}>
                {translate("noCodeAvailable")}
              </Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
      <ShareQrModal
        setShareQRVisibility={setShareQRVisibility}
        shareQRVisibility={shareQRVisibility}
        collectionCode={collectionCode}
        shareCode={shareCollectionCode}
        setFile={setFile}
        onPressExpireCode={expireQRCode}
      />
    </SafeAreaView>
  );
};

export default CodeCollection;
