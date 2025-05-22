import { translate } from '@translations/translate';
import React, { useState } from 'react';
import { Alert, RefreshControl, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirKeyButton } from 'src/components/atom/airKeyButton';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import ViewHistoryButton from 'src/components/buttons/viewHistoryButton';
import KeyDetail from 'src/components/details/keydetailscreen';
import GenerateQRModal from 'src/components/modal/generateqrmodal';
import ShareQrModal from 'src/components/modal/shareqrmodal';
import KeyDetailMap from 'src/components/maps/keydetailmap';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getKeyDetail } from 'src/redux/actions/getKeyDetail';
import { Loader } from 'src/components/loader/loader';
import RouteNames from '@routeNames';
import QRCode from 'react-native-qrcode-svg';
import DatePicker from 'react-native-date-picker';
import { ISetValidity } from '@interfaces/ISetValidity';
import { setKeyValidateAPI } from 'src/redux/actions/setValidateKey';
import { setKeyValidityStateReset } from 'src/redux/slices/setValidity';
import Share from 'react-native-share';
import { getCollectionCodeStateReset } from 'src/redux/slices/getCollectionCode';
import SubscriptionCard from 'src/components/atom/subscriptionCard';
import { cancelSubscriptionAPIRequest } from 'src/redux/actions/cancelSubscription';
import Colors from '@assets/colors/Colors';
import { deleteKeyAPIRequest } from 'src/redux/actions/deletekey';
import { getKeyCatalog } from 'src/redux/actions/getKeyCatalog';
import { deleteKeyStateReset } from 'src/redux/slices/deleteKey';

const KeyDetailScreen = (props: any) => {
  const { navigation } = props;
  const keyID = props?.route?.params?.keyId;
  const dispatch = useAppDispatch();

  const [generateQRVisibility, setGenerateQRVisibility] = React.useState(false);
  const [shareQRVisibility, setShareQRVisibility] = React.useState(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [forever, setForever] = useState(false);
  const [collectionCode, setcollectionCode] = useState('');
  const [file, setFile] = useState('');
  const { loading, response } = useAppSelector((store) => store.getKeyDetail);
  const [expired, setExpired] = useState(false);
  const [tag, setTag] = useState('');
  const {
    loading: getCodeLoading,
    response: getCodeResp,
    error: collectionCodeError,
  } = useAppSelector((store) => store.getCollectionCode);
  const {
    response: validityResponse,
    error: validityError,
    loading: validityLoading,
  } = useAppSelector((store) => store.setValidity);
  const {
    response: cancelSubResponse,
    error: cancelSubError,
    loading: cancelSubLoading,
  } = useAppSelector((store) => store.cancelSub);
  const { response: deleteKeyResponse, loading: deleteKeyLoading } =
    useAppSelector((store) => store.deleteKey);

  React.useEffect(() => {
    dispatch(getKeyDetail(keyID));
  }, []);
  React.useEffect(() => {
    if (deleteKeyResponse) {
      navigation.navigate(RouteNames.homePage.name);
      dispatch(getKeyCatalog());
      dispatch(deleteKeyStateReset());
    }
  }, [deleteKeyResponse]);

  React.useEffect(() => {
    let date = new Date();
    if (response) {
      let expiryDate = new Date(
        response?.data?.subscriptionExpriyString * 1000
      );
      if (expiryDate < date) {
        setExpired(true);
      } else {
        setExpired(false);
      }
    }
  }, [response]);

  React.useEffect(() => {
    if (cancelSubError) {
      console.log(cancelSubError);
    }
    if (cancelSubResponse) {
      dispatch(getKeyDetail(keyID));
    }
  }, [cancelSubResponse]);

  React.useEffect(() => {
    if (getCodeResp) {
      setcollectionCode(getCodeResp.data.code.toString());
      setShareQRVisibility(true);
    }
    if (collectionCodeError?.status === 400) {
      setGenerateQRVisibility(true);
    }
    dispatch(getCollectionCodeStateReset());
  }, [getCodeResp, collectionCodeError]);

  React.useEffect(() => {
    if (validityResponse) {
      setcollectionCode(validityResponse.data.shareCollectionCode.toString());
      setShareQRVisibility(true);
    }
    if (validityError) {
      Alert.alert(validityError.data);
    }
    dispatch(setKeyValidityStateReset());
  }, [validityResponse, validityError]);

  const handleUpdateDetails = () => {
    navigation.navigate(RouteNames.UpdateKeyScreen.name, {
      keyDetail: response?.data,
    });
  };

  const handleViewHistory = () => {
    navigation.navigate(RouteNames.historyScreen.name, {
      keyDetail: response?.data,
    });
  };
  const handleViewCode = () => {
    navigation.navigate(RouteNames.CodeCollection.name, {
      keyDetail: response?.data,
    });
  };

  const handleShareQr = () => {
    if (expired) {
      Alert.alert(translate('subscription'), translate('renewPlan'), [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Renew',
          onPress: () => {
            navigation.navigate(RouteNames.subscriptionPlanPage.name, {
              name: response?.data._id,
              newKey: false,
            });
          },
        },
      ]);
    } else setGenerateQRVisibility(true);
  };

  const renewSubscription = () => {
    Alert.alert(translate('subscription'), translate('renewPlan'), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Renew',
        onPress: () => {
          navigation.navigate(RouteNames.subscriptionPlanPage.name, {
            name: response?.data._id,
            newKey: false,
          });
        },
      },
    ]);
  };

  const selectDate = () => {
    setOpen(true);
  };

  function formatDate(inputDate: any) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  async function generateCollCode() {
    if (date) {
      const params: ISetValidity = {
        date: date.toString(),
        id: keyID,
        forever: forever,
        tag: tag,
      };
      setGenerateQRVisibility(false);
      dispatch(setKeyValidateAPI(params));
      setDate(undefined);
      setForever(false);
      setTag('');
    } else {
      const params: ISetValidity = {
        date: formatDate(date),
        id: keyID,
        forever: forever,
        tag: tag,
      };
      console.log(params);

      setGenerateQRVisibility(false);
      dispatch(setKeyValidateAPI(params));
      setDate(undefined);
      setForever(false);
      setTag('');
    }
  }

  async function shareCollectionCode(params: any) {
    Share.open({ url: file, title: params, message: params })
      .then((res) => {
        setShareQRVisibility(false);
      })
      .catch((error) => {});
  }

  const renderQrDetail = () => {
    if (response?.data?.key_status == 0) {
      return (
        <View style={styles.qrView}>
          <Text style={styles.qrText}>{translate('keyQr')}</Text>
          <QRCode value={response?.data?.key_QR.toString()} size={192} />
          <Text style={styles.code}>
            {translate('code')}
            <Text style={[styles.code, styles.codeText]}>
              {response?.data?.key_QR}
            </Text>
          </Text>
        </View>
      );
    }
  };

  const refreshControl = () => {
    dispatch(getKeyDetail(keyID));
  };
  const handleDeleteKey = () => {
    console.log('response?.data?.key_status', response?.data?.key_status)
    if(response?.data?.key_status === 2){
      Alert.alert('Key is in-use.','Can\'t delete this key.')
      return;
    }
    Alert.alert(translate('deleteKey'), translate('deleteDesc'), [
      {
        text: translate('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: translate('deleteKey'),
        onPress: () => {
          dispatch(deleteKeyAPIRequest({ key_id: keyID }));
        },
      },
    ]);
  };

  function handleCancel() {
    Alert.alert(translate('cancelSub'), translate('cancelDesc'), [
      {
        text: translate('keepSub'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: translate('cancelSub'),
        onPress: () => {
          dispatch(cancelSubscriptionAPIRequest({ key_Id: keyID }));
        },
      },
    ]);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader
        loading={
          validityLoading ||
          getCodeLoading ||
          cancelSubLoading ||
          deleteKeyLoading
        }
      />
      <View style={styles.container}>
        <View style={styles.backButton}>
          <AirKeyHeader
            onPressBack={navigation.goBack}
            text={response?.data ? response?.data.name : ''}
          />
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshControl} />
          }
        >
          {response && <KeyDetailMap mapLocation={response?.data} />}
          <KeyDetail detailResponse={response?.data} />
          {response?.data?.key_status !== 0 && (
            <ViewHistoryButton
              onPress={handleViewCode}
              title={translate('viewCollectionCode')}
            />
          )}
          {response?.data?.key_status !== 0 && (
            <ViewHistoryButton
              onPress={handleViewHistory}
              title={translate('viewKeyHistory')}
            />
          )}
          <SubscriptionCard
            data={response?.data}
            onPressCancel={() => {
              handleCancel();
            }}
            onPressRenew={renewSubscription}
          />
          {renderQrDetail()}
          <View style={styles.footer}>
            {response?.data?.key_status !== 3 && (
              <AirKeyButton
                text={translate('deleteKey')}
                onPress={handleDeleteKey}
                buttonStyle={[
                  styles.shareQrButton,
                  {
                    backgroundColor: Colors.error_red,
                  },
                ]}
                // disable={response?.data?.key_status !== 2}
                // buttonStyle={[
                //   styles.shareQrButton,
                //   {
                //     backgroundColor: Colors.error_red,
                //   },
                // ]}
              />
            )}
            <AirKeyButton
              text={translate('createCollectionCode')}
              buttonStyle={[
                styles.shareQrButton,
                {
                  backgroundColor:
                    response?.data?.key_status === 0
                      ? Colors.light_grey
                      : Colors.black,
                },
              ]}
              onPress={handleShareQr}
              disable={response?.data?.key_status === 0 ? true : false}
            />
            <AirKeyButton
              text={translate('updateDetails')}
              onPress={handleUpdateDetails}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <DatePicker
        modal
        mode='datetime'
        open={open}
        date={date ? date : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          setForever(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        minimumDate={new Date()}
      />
      <GenerateQRModal
        generateQRVisibility={generateQRVisibility}
        setGenerateQRVisibility={setGenerateQRVisibility}
        selectDate={selectDate}
        formattedDate={date ? formatDate(date) : ''}
        generateCollectionCode={generateCollCode}
        expire={forever}
        onPressCheckBox={() => {
          setForever(!forever);
          setDate(undefined);
        }}
        value={tag}
        onChange={(text) => setTag(text)}
      />
      <ShareQrModal
        setShareQRVisibility={setShareQRVisibility}
        shareQRVisibility={shareQRVisibility}
        collectionCode={collectionCode}
        shareCode={shareCollectionCode}
        setFile={setFile}
      />
    </SafeAreaView>
  );
};

export default KeyDetailScreen;
