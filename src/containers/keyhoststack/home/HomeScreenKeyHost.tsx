import IMAGES from "@assets/images";
import { translate } from "@translations/translate";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import KeyInfoButton from "src/components/buttons/keyinfobutton";
import RetireReportButton from "src/components/buttons/retireReportButton";
import HomeHeaderKeyHost from "src/components/headers/homeheaderkeyhost";
import HomeKeyList from "src/components/list/homekeylist";
import HomeKeysModal from "src/components/modal/homekeysmodal";
import { styles } from "./Styles";
import KeyModalQr from "src/components/modal/addKeyModal";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { registerNewKeyAPI } from "src/redux/actions/registerNewKey";
import { Loader } from "src/components/loader/loader";
import { linkKeyRingAPI } from "src/redux/actions/linkKeyRing";
import KeyRingSuccessModal from "src/components/modal/keyRingSuccessModal";
import { linkKeyRingStateReset } from "src/redux/slices/linkKeyRing";
import { hostProfileAPI } from "src/redux/actions/hostProfile";
import { useNavigation } from "@react-navigation/native";
import RouteNames from "@routeNames";
import { updateKeyStatusAPI } from "src/redux/actions/updateKeyStatus";
import { IUpdateKeyStatus } from "@interfaces/IUpdateKeyStatus";
import { registerNewKeyStateReset } from "src/redux/slices/registerNewKey";
import { unreadCountAPI } from "src/redux/actions/unreadCount";
import ScannedErrorModal from "src/components/modal/scannedErrorModal";
import { retireKeyAPI, retireKeyInterface } from "src/redux/actions/retireKey";
import ReportKeyModal from "src/components/modal/reportKeyModal";
import { reportKeyAPI } from "src/redux/actions/reportKey";
import { reportKeyStateReset } from "src/redux/slices/reportKey";
import { getAuthToken, getData } from "src/asyncstorage";

const HomeScreenKeyHost = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { response: hostProfileDetail } = useAppSelector(
    (state) => state.hostProfile
  );

  const {
    error: scannedError,
    loading: scanningKeyLoading,
    response: scannedKeyResp,
  } = useAppSelector((state) => state.scanKey);
  const {
    error: linkKeyError,
    loading: linkKeyLoading,
    response: linkKeyResp,
  } = useAppSelector((state) => state.linkKeyRing);
  const { response: unreadCount } = useAppSelector(
    (state) => state.unreadCount
  );
  const {
    response: keyStatusResp,
    error: keyStatusError,
    loading: keyStatusLoading,
  } = useAppSelector((state) => state.keyStatus);
  const { response: retireKeyResp, error: retireKeyError } = useAppSelector(
    (state) => state.retireKey
  );
  const { error: reportKeyError, response: reportKeyResp } = useAppSelector(
    (state) => state.reportKey
  );

  const [scannedErrorModal, setScannedErrorModal] = useState(false);
  const [reportKeyModal, setReportKeyModal] = useState(false);
  const [errorString, setErrorString] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [newKey, setNewKey] = useState(false);
  const [QRLable, setQRLable] = useState("");
  const [keyCode, setKeyCode] = useState<string>();

  const [selectedKey, setSelectedKey] = useState<
    | "Register New key"
    | "Collect key"
    | "Give a key"
    | "Retire Key"
    | "Report Key"
    | "Key info"
  >("Register New key");

  useEffect(() => {
    dispatch(hostProfileAPI());
    dispatch(unreadCountAPI());
    // getToken()
  }, []);


  useEffect(() => {
    if (retireKeyError) {
      if (retireKeyError.status === 503) {
        setScannedErrorModal(true);
        setErrorString("Something went wrong! Try again!");
      } else {
        setScannedErrorModal(true);
        setErrorString(retireKeyError.data);
      }
    }
    if (retireKeyResp) {
      setModalVisibility(false);
    }
  }, [retireKeyResp, retireKeyError]);

  useEffect(() => {
    if (reportKeyError) {
      if (reportKeyError.status === 503) {
        setScannedErrorModal(true);
        setErrorString("Something went wrong! Try again!");
      } else {
        setScannedErrorModal(true);
        setErrorString(reportKeyError.data);
      }
    }
    if (reportKeyResp) {
      dispatch(reportKeyStateReset());
      // setLinkSuccess(true);
    }
  }, [reportKeyResp, reportKeyError]);

  useEffect(() => {
    if (keyStatusError) {
      if (keyStatusError.status === 503) {
        setScannedErrorModal(true);
        setErrorString("Something went wrong! Try again!");
      } else {
        setScannedErrorModal(true);
        setErrorString(keyStatusError.data);
      }
    }
    if (keyStatusResp) {
      setLinkSuccess(true);
    }
  }, [keyStatusResp, keyStatusError]);

  useEffect(() => {
    if (scannedError) {
      setCameraVisible(false);
      setModalVisibility(false); // 🔧 CRITICAL FIX
      setKeyCode(undefined);

      if (scannedError.status === 503) {
        setScannedErrorModal(true);
        setErrorString("Something went wrong! Try again!");
      } else {
        setScannedErrorModal(true);
        setErrorString(scannedError.data || "No key found");
      }
    }
  }, [scannedError]);

  useEffect(() => {
    if (scannedError) {
      if (scannedError.status === 503) {
        setScannedErrorModal(true);
        setErrorString("Something went wrong! Try again!");
      } else {
        setScannedErrorModal(true);
        setErrorString(scannedError.data);
      }
    }
    setKeyCode(undefined);
    if (scannedKeyResp) {
      if (scannedKeyResp.data.key_status === 0) {
        setTimeout(() => {
          setModalVisibility(true);
        }, 100);
      } else {
        if (newKey) {
          setErrorString(translate("alreadyInUse"));
          setScannedErrorModal(true);
        } else {
          if (
            scannedKeyResp.data.key_status === 2 &&
            selectedKey === "Retire Key"
          ) {
            setScannedErrorModal(true);
            setErrorString(translate("cannotRetireInUseKey"));
          }
          if (selectedKey === "Report Key") {
            setReportKeyModal(true);
          }
          setTimeout(() => {
            setModalVisibility(true);
          }, 100);
        }
      }
    }
  }, [scannedError, scannedKeyResp]);

  useEffect(() => {
    if (linkKeyError?.status) {
      setScannedErrorModal(true);
      setErrorString(linkKeyError.data);
    }
    if (linkKeyResp) {
      setLinkSuccess(true);
      dispatch(linkKeyRingStateReset());
    }
  }, [linkKeyError, linkKeyResp]);

  const handleKeyInfoPress = () => {
    setSelectedKey("Key info");
    setNewKey(false);
    setCameraVisible(true);
    setQRLable("Key info");
  };

  const handleItemPress = (item: any) => {
    setSelectedKey(item.name);
    if (item.id === 1) {
      setQRLable("Scan key QR");
      setNewKey(true);
      dispatch(registerNewKeyStateReset());
      setCameraVisible(true);
    } else if (item.id === 2) {
      setNewKey(false);
      setQRLable("Key drop");
      setCameraVisible(true);
    } else if (item.id === 3) {
      setNewKey(false);
      setQRLable("Scan collect QR");
      setCameraVisible(true);
    } else {
      setNewKey(false);
    }
  };

  async function handleUpdateKeyStatus(keyStatus: number) {
    setModalVisibility(false);
    const params: IUpdateKeyStatus = {
      key_id: scannedKeyResp?.data?.key_id ?? "",
      key_status: keyStatus,
    };
    dispatch(updateKeyStatusAPI(params));
  }

  function submitScannedQR(data: string) {
    setCameraVisible(false);

    if (data) {
      if (newKey) {
        if (scannedKeyResp) {
          setCameraVisible(false);
          if (selectedKey !== "Retire Key") {
            const params = {
              // code: keyCode,
              // slot_id: scannedKeyResp
              //   ? scannedKeyResp.data.key_slot_location
              //   : 14,
              // box_id: scannedKeyResp ? scannedKeyResp.data.box_id : "",
              // key_id: scannedKeyResp ? scannedKeyResp.data.key_id : "",
              code: data,
              _id: scannedKeyResp ? scannedKeyResp.data._id : "",
              key_id: scannedKeyResp ? scannedKeyResp.data.key_id : "",
              slot_id: scannedKeyResp
                ? scannedKeyResp.data.key_slot_location
                : 10,
            };
            dispatch(linkKeyRingAPI(params));
          } else {
            let params: retireKeyInterface = {
              _id: scannedKeyResp?.data._id ?? "",
              key_id: scannedKeyResp?.data.key_id ?? "",
              new_keyring_Id: data.toString(),
              ops_type: 1,
            };
            dispatch(retireKeyAPI(params));
          }
          setKeyCode(undefined);
        } else {
          setCameraVisible(false);
          const params = {
            code: data,
            type: 1,
          };
          dispatch(registerNewKeyAPI(params));
          setKeyCode(undefined);
        }
      } else {
        setCameraVisible(false);
        const params = {
          code: data,
          type:
            selectedKey === "Register New key"
              ? 1
              : selectedKey === "Give a key"
              ? 2
              : selectedKey === "Collect key"
              ? 3
              : selectedKey === "Key info"
              ? 4
              : selectedKey === "Retire Key"
              ? 5
              : selectedKey === "Report Key"
              ? 6
              : 4,
        };
        dispatch(registerNewKeyAPI(params));
        setKeyCode(undefined);
      }
    }
  }
  function closeAllModal() {
    setScannedErrorModal(false);
    setModalVisibility(false); // 🔧 Close HomeKeysModal
    setReportKeyModal(false); // 🔧 Cl ̰ose Report modal (if needed)
    setCameraVisible(false); // 🔧 Close camera QR modal (safety net)
    setLinkSuccess(false);
  }
  function linkKey() {
    setModalVisibility(false);
    setQRLable("Scan keyring");
    setTimeout(() => {
      setCameraVisible(true);
    }, 1000);
  }

  function retireKey() {
    setNewKey(false);
    setQRLable("Retire Key");
    setCameraVisible(true);
    setSelectedKey("Retire Key");
  }

  function reportKey() {
    setNewKey(false);
    setQRLable("Report Key");
    setCameraVisible(true);
    setSelectedKey("Report Key");
  }

  function handleKeyRetireOrReplace(type: number) {
    setModalVisibility(false);
    if (type === 1) {
      setNewKey(true);
      linkKey();
    } else if (type === 2) {
      setNewKey(true);
      setCameraVisible(false);
      let params: retireKeyInterface = {
        _id: scannedKeyResp?.data._id ?? "",
        key_id: scannedKeyResp?.data.key_id ?? "",
        ops_type: type,
      };
      dispatch(retireKeyAPI(params));
    }
  }
  function handleReportKey(data: any) {
    setReportKeyModal(false);
    const params = {
      ...data,
      key_id: scannedKeyResp?.data?.key_id ?? "",
    };
    dispatch(reportKeyAPI(params));
    closeAllModal();
  }

  if (scanningKeyLoading || linkKeyLoading || keyStatusLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HomeHeaderKeyHost
          data={hostProfileDetail?.data}
          onPressProfile={() =>
            navigation.navigate(RouteNames.hostProfile.name)
          }
          onPressNotification={() =>
            navigation.navigate(RouteNames.notificationPage.name)
          }
          unreadCount={unreadCount?.data.unreadNotifications}
        />
        <View style={styles.keyList}>
          <HomeKeyList onPressKey={handleItemPress} />
          <KeyInfoButton onPress={handleKeyInfoPress} />
          <View style={styles.header}>
            <RetireReportButton
              text={translate("retireKey")}
              image={IMAGES.keyGuest_Icon}
              onPress={() => retireKey()}
            />
            <RetireReportButton
              text={translate("reportKey")}
              image={IMAGES.report_key}
              onPress={() => reportKey()}
            />
          </View>
        </View>
      </View>
      {/* Modal */}
      <HomeKeysModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        title={selectedKey}
        data={scannedKeyResp?.data}
        linkKeyPress={linkKey}
        onpressUpdate={handleUpdateKeyStatus}
        retireKey={handleKeyRetireOrReplace}
      />
      {/* Camera modal */}
      <KeyModalQr
        setVisible={setCameraVisible}
        isVisible={cameraVisible}
        title={QRLable}
        onPressSubmit={submitScannedQR}
        setKeyCode={setKeyCode}
        keyCode={keyCode}
      />
      {/* Success modal */}
      <KeyRingSuccessModal
        isVisible={linkSuccess}
        setVisible={setLinkSuccess}
        dispatch={dispatch}
        data={scannedKeyResp?.data}
        title={selectedKey}
      />
      {/* Error text modal */}
      <ScannedErrorModal
        closeAllModal={() => {
          closeAllModal();
        }}
        error={errorString}
        modalVisibility={scannedErrorModal}
      />
      {/* Report key modal */}
      <ReportKeyModal
        setModalVisibility={setReportKeyModal}
        modalVisibility={reportKeyModal}
        onPress={handleReportKey}
        keyDetail={scannedKeyResp?.data}
        closeAllModal={() => {
          closeAllModal();
        }}
      />
    </View>
  );
};

export default HomeScreenKeyHost;
