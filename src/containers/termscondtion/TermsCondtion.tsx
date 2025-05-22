import { translate } from "@translations/translate";
import React from "react";
import { SafeAreaView, View } from "react-native";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import { styles } from "./Styles";
import TermsConditionList from "src/components/list/termscondtionlist";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "src/redux/hooks";
import { Loader } from "src/components/loader/loader";

const TermsConditionScreen = () => {
  const navigation = useNavigation();
  const { response, loading } = useAppSelector((state) => state.appCondtions);

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.container}>
        <View style={styles.header}>
          <AirKeyHeader
            text={translate("termsCondition")}
            onPressBack={navigation.goBack}
          />
        </View>
        <TermsConditionList data={response?.data.description ?? ""} />
      </View>
    </SafeAreaView>
  );
};

export default TermsConditionScreen;
