import Colors from "@assets/colors/Colors";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { useNavigation } from "@react-navigation/native";
import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { AirKeyButton } from "../atom/airKeyButton";
import CustomModal from "../atom/CustomModal";
import KeyHostDetail from "../details/keyhostdetail";
import { KeyHost } from "src/typings/global";
import { useAppDispatch } from "src/redux/hooks";
import { notifyOwnerRequest } from "src/redux/actions/notify";

type props = {
  keyHostVisibility: boolean;
  setKeyHostVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  hostDetail?: KeyHost;
  navigation?: any;
  button?: boolean;
};

const KeyHostModal = (props: props) => {
  const dispatch = useAppDispatch();
  const { keyHostVisibility, setKeyHostVisibility, hostDetail, button } = props;

  const closeModal = () => {
    setKeyHostVisibility(false);
  };

  function closeModalNavigation() {
    if (hostDetail?.availableSlots !== 0) {
      props.navigation.navigate(RouteNames.addKeyPage.name, {
        hostDetail: hostDetail,
      });
      setKeyHostVisibility(false);
    } else {
      setKeyHostVisibility(false);
      dispatch(notifyOwnerRequest({ key_host_id: hostDetail._id }));
    }
  }
  return (
    <CustomModal visible={keyHostVisibility} closeModal={closeModal}>
      <Text style={styles.title}>{translate("keyHost")}</Text>
      <KeyHostDetail hostDetail={hostDetail} />
      {button && (
        <AirKeyButton
          buttonStyle={styles.selectHost}
          text={
            hostDetail?.availableSlots !== 0
              ? translate("selectHost")
              : translate("requestUsingStore")
          }
          onPressOut={closeModalNavigation}
        />
      )}
    </CustomModal>
  );
};

export default KeyHostModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center",
    marginTop: hp(3),
  },
  selectHost: {
    marginTop: hp(2),
    marginBottom: hp(1),
  },
});
