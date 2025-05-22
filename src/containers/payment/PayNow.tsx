import {
  Details,
  Methods,
} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { AirKeyButton } from 'src/components/atom/airKeyButton';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '@routeNames';
import { Loader } from 'src/components/loader/loader';
import { addKeyAPIRequest, createPayment } from 'src/redux/actions/addKey';
import { IAddKey } from '@interfaces/IAddKey';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { styles } from './Style';
import { addKeyStateReset } from 'src/redux/slices/addKey';
import { getKeyCatalog } from 'src/redux/actions/getKeyCatalog';
import Colors from '@assets/colors/Colors';
import PaymentCard from 'src/components/atom/paymentCard';
import { getPaymentMethodAPI } from 'src/redux/actions/paymentMethod';
import { translate } from '@translations/translate';
import { renewSubscriptionAPIRequest } from 'src/redux/actions/renewSubscription';
import { renewSubscriptionStateReset } from 'src/redux/slices/renewSubscription';
import { generatePaymentMethod, generateToken } from './methods';
import PaymentDetails from 'src/components/details/paymentDetail';
import { Alert } from 'react-native';
import { getAuthToken } from 'src/asyncstorage';
import { io } from 'socket.io-client';

const PayNowScreen = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const selectedData = props.route.params ? props.route.params.planData : null;
  const newKey = props.route.params ? props.route.params.newKey : null;
  const [token, setToken] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');

  React.useEffect(() => {
    const loadToken = async () => {
      const authToken = await getAuthToken(); // Get token from async storage
      if (authToken) {
        setToken(authToken); // Set token in state
      } // Mark token as loaded
    };

    loadToken(); // Run the load token function on component mount
  }, []);


  const registerUserToken = async (socket: any) => {
    socket.emit('register', token);
  };

  const { confirmPayment } = useStripe();

  const confirm3dPayment = async (data: any, paymentMethodId: string) => {
    console.log(data)
    if (!data?.client_secret) {
      Alert.alert(
        'Payment Error',
        "We couldn't process your request. Please try again."
      );
      return;
    }

    try {
      const { error, paymentIntent } = await confirmPayment(data?.client_secret, {
        paymentMethodType: 'Card', // or 'Ideal', 'SepaDebit', etc.
        paymentMethodData: {paymentMethodId: paymentMethodId}, // <== your payment method ID
      });
   
      // {"data": "The `payment_method` parameter supplied pm_1RGekkHbgDUtS1J3Ufd4c6XU belongs to the Customer cus_SB0mUa3LuGVNvy. Please include the Customer in the `customer` parameter on the PaymentIntent.", "status": 400}
      if (error) {
        console.log('Payment Error:', error);
        Alert.alert(
          'Payment Failed',
          error.message ?? 'Your payment was unsuccessful, and the key has not been created. Please try again or check your payment details.',
          [{ text: 'OK', onPress: () => console.log('OKAY') }]
        );
      } else {
        console.log('Payment Success:', paymentIntent);
        createKey(data);
      }
    } catch (err) {
      console.log('Unexpected Error:', err);
      Alert.alert(
        'Payment Error',
        'An unexpected issue occurred while processing your payment. The key has not been created. Please try again later.'
      );
    }
  };
  const apiKey =
    'pk_live_51Q3LalHbgDUtS1J3ETs6hYorgss6gso6Ev1Ipwo3hHeu2ALwW5Nv1byFa7KSFBE9o0fQnMOjz0Uv78cViY1yBngi000SQf5ZiL';
  const paymentData = useAppSelector((state) => state.getPlans.response?.data);

  const [cardInfo, setCardInfo] = useState<Details>();
  const [selectedItem, setSelectedItem] = React.useState<string>('');
  const [loader, setLoader] = useState(false);
  const [stripeData, setStripeData] = React.useState({});
  // const [currencyCode, setCurrencyCode] = useState('1');
  const { loading, response, error } = useAppSelector((state) => state.addKey);
  const {
    loading: renewSubLoader,
    response: renewSubResp,
    error: renewSubError,
  } = useAppSelector((state) => state.renewSubscription);
  const { response: paymentMethodResp } = useAppSelector(
    (state) => state.paymentMethods
  );
  const ref = useRef<Methods | null>(null);
  const [paymentError, setPaymentError] = useState('');

  React.useEffect(() => {
    dispatch(getPaymentMethodAPI());
    setPaymentError('');
    dispatch(renewSubscriptionStateReset());
    return () => {
      dispatch(addKeyStateReset());
    };
  }, []);
  React.useEffect(() => {
    if (response || renewSubResp) {
      Alert.alert(
        'Payment Processing Alert',
        'Your payment has been processed successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate(RouteNames.homePage.name);
            },
          },
        ],
        { cancelable: false }
      );
      dispatch(addKeyStateReset());
      dispatch(renewSubscriptionStateReset());
      dispatch(getKeyCatalog());
    }
    if (error) {
      setPaymentError(error.data);
    }
    if (renewSubError) {
      setPaymentError(renewSubError.data);
    }
  }, [response, error, renewSubResp]);

  const handlCardDetails = (cardDetail: Details) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(undefined);
    }
  };

  const payNowButton = async () => {
    setPaymentError('');
    setLoadingOnOff(true);
    try {
      if (selectedItem === '') {
        let cardAlreadyExists = paymentMethodResp?.data.find(
          (card) => card.last4 === cardInfo?.last4
        )?.payment_method;

        if (cardAlreadyExists) {
          setCardInfo(undefined)
          ref.current?.clear();
          setSelectedItem(cardAlreadyExists);
          SucessPayment(cardAlreadyExists, false);
        } else {
          const token = await generateToken(
            cardInfo,
            paymentData?.stripe_public_key || apiKey
          ).finally(() => {
            setCardInfo(undefined);
            ref.current?.clear();
          });
          if (!token) {
            setLoadingOnOff(false);
            throw new Error('Failed to generate token.');
          }

          const paymentMethod = await generatePaymentMethod(
            token.id,
            paymentData?.stripe_secret_key || ''
          );

          if (!paymentMethod) {
            throw new Error('Failed to create payment method.');
          }
          setPaymentMethod(paymentMethod.id);
          SucessPayment(paymentMethod.id, true);
        }
      } else {
        SucessPayment(null, false);
      }
    } catch (error: any) {
      setCardInfo(undefined);
      setPaymentError(
        error.response.data.error.message ||
          'Something went wrong! Please try again later'
      );
    } finally {
      setLoadingOnOff(false);
    }
  };

  const setLoadingOnOff = (param: boolean) => {
    setLoader(param);
  };

  const createKey = (data: any) => {
    setLoader(false);
    const param: IAddKey = {
      planId: selectedData?.sub?._id,
      paymentMethodId: selectedItem ?? paymentMethod,
      name: selectedData?.hostData?.name,
      description: selectedData?.hostData?.description,
      selected_key_host: selectedData?.hostData?.hostData,
      newCard: selectedItem === '' ? true : false,
      couponId: selectedData.coupon == null ? '' : selectedData.coupon._id,
      ...data,
      subscription_active_status: 'active'
    };
    console.log('params', param, stripeData)
    dispatch(addKeyAPIRequest(param));
  };
  const SucessPayment = async (paymentMethodId: string | null, newCard: boolean = false) => {
    if (newKey) {
      const param: IAddKey = {
        planId: selectedData?.sub?._id,
        paymentMethodId: paymentMethodId ?? selectedItem ?? paymentMethod,
        name: selectedData?.hostData?.name,
        description: selectedData?.hostData?.description,
        selected_key_host: selectedData?.hostData?.hostData,
        newCard: newCard,
        couponId: selectedData.coupon == null ? '' : selectedData.coupon._id,
      };
      console.log('paramas', param)
      await dispatch(createPayment(param))
        .then((d: any) => {
          console.log('payment response and data with it', d.data)
          setStripeData(d?.data ?? {});
          setLoadingOnOff(false);
          if (d?.data?.action_required === 'subscription_payment_required') {
            confirm3dPayment(d?.data, paymentMethodId ?? selectedItem ?? paymentMethod);
          }
        })
        .catch((e) => {
          Alert.alert('Payment Failed', e.data);
        });
    } else {
      const param = {
        key_id: selectedData?.hostData,
        planId: selectedData?.sub?._id,
        paymentMethodId: paymentMethod,
        newCard: newCard,
        couponId: selectedData.coupon == null ? '' : selectedData.coupon._id,
      };
      await dispatch(renewSubscriptionAPIRequest(param));
    }
  };
  const calculateCouponAmount = (amount: number, coupon: any) => {
    if (!coupon) return 0; // No coupon, no discount

    const couponAmount = parseFloat(coupon.coupon_amount) || 0; // Coupon amount
    const couponType = coupon.coupon_type; // Coupon type (1 for flat, 2 for percentage)

    if (couponType === 1) {
      // Flat discount
      if (selectedData?.sub.total_price - couponAmount <= 0) {
        return selectedData?.sub.total_price;
      }
      return couponAmount;
    } else if (couponType === 2) {
      // Percentage discount
      return (amount * couponAmount) / 100;
    }

    return 0; // Default case
  };
  const couponDiscount = calculateCouponAmount(
    selectedData?.sub.total_price,
    props?.route?.params?.planData.coupon
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <AirKeyHeader onPressBack={navigation.goBack} />
          {/* <Loader loading={loading || loader || renewSubLoader} /> */}
          <ScrollView
            style={styles.container}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
          >
            <PaymentDetails
              subscriptionAmount={selectedData?.sub.total_price * 1}
              // taxAmount={taxAmount * (paymentData?.local_currency_price ?? 1)}
              totalAmount={(selectedData?.sub.total_price - couponDiscount) * 1}
              couponAmount={couponDiscount * 1}
              currencyCode={'GBP'}
            />
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                placeholderColor: '#9A9A9A',
              }}
              style={styles.cardField}
              onCardChange={(cardDetails) => {
                handlCardDetails(cardDetails);
              }}
              onFocus={() => {
                setSelectedItem('');
              }}
              ref={ref}
              dangerouslyGetFullCardDetails={true}
              // disabled={selectedItem === "" ? false : true}
            />
            <FlatList
              data={paymentMethodResp?.data}
              renderItem={({ item }) => {
                const isSelected =
                  selectedItem == item.payment_method ? true : false;
                return (
                  <PaymentCard
                    data={item}
                    selected={isSelected}
                    onPressItem={(item) => {
                      if (ref.current) {
                        ref.current?.clear();
                      }
                      if (selectedItem === item) {
                        setSelectedItem('');
                      } else {
                        setSelectedItem(item);
                      }
                    }}
                  />
                );
              }}
              ListEmptyComponent={()=>{
                return (
                  <View style={styles.emptyListConatiner}>
                    <Text>There is no payment methods added.</Text>
                  </View>
                )
              }}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={() => {
                return (
                  <Text style={styles.header}>
                    {translate('paymentMethod')}
                  </Text>
                );
              }}
            />
            {paymentError && (
              <Text style={styles.errorStyle}>{paymentError}</Text>
            )}
          </ScrollView>
          <AirKeyButton
            displayLoading={loading || loader || renewSubLoader}
            text='Pay Now'
            onPress={() => {
              payNowButton();
            }}
            disable={
              cardInfo === undefined && selectedItem === '' ? true : false || loading || loader || renewSubLoader
            }
            buttonStyle={{
              backgroundColor:
                selectedItem !== ''
                  ? Colors.primary_color
                  : cardInfo
                  ? Colors.primary_color
                  : 'gray',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PayNowScreen;
