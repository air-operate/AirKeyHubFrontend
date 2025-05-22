import { View, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "./styles";
import { translate } from "@translations/translate";
import AddKeyInput from "src/components/inputs/addKeyInput";
import AirKeyHeader from "src/components/atom/AirKeyHeader";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "src/redux/hooks";
import HostProfileView from "src/components/atom/hostProfileView";

const HostProfile = () => {
  const navigation = useNavigation();
  const { response: hostProfileDetail } = useAppSelector(
    (state) => state.hostProfile
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AirKeyHeader
            text={translate("profile")}
            onPressBack={navigation.goBack}
          />
          <HostProfileView
            imageSource={hostProfileDetail?.data.profileImage}
            text={hostProfileDetail?.data.name}
          />
          <View style={styles.centerSection}>
            <AddKeyInput
              text={translate("fullName")}
              textStyle={styles.label}
              textInputStyle={styles.input}
              placeHolder={hostProfileDetail?.data.name}
              // value={hostProfileDetail?.data.name}
              editable={false}
            />
            <AddKeyInput
              text={translate("emailAdd")}
              textStyle={styles.label}
              textInputStyle={styles.input}
              placeHolder={hostProfileDetail?.data.email}
              editable={false}
            />
            <AddKeyInput
              text={translate("phoneNumber")}
              textStyle={styles.label}
              textInputStyle={styles.input}
              placeHolder={hostProfileDetail?.data.phoneNumber.toString()}
              editable={false}
            />
            <AddKeyInput
              text={translate("location")}
              textStyle={styles.label}
              textInputStyle={styles.input}
              placeHolder={hostProfileDetail?.data.address}
              editable={false}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HostProfile;
