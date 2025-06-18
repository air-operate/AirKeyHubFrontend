import { Close_Icon, Coupon_Icon, Right_Arrow } from '@assets/images/indexes';
import RouteNames from '@routeNames';
import { translate } from '@translations/translate';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirKeyButton } from 'src/components/atom/airKeyButton';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import { Loader } from 'src/components/loader/loader';
import { getPlans } from 'src/redux/actions/getPlans';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { DataEntity, couponListData } from 'src/typings/global';
import { styles } from './styles';
import Colors from '@assets/colors/Colors';
import SubscriptionPlansList from 'src/components/list/SubscriptionPlansList';
import VoucherModal from 'src/components/modal/voucherModal';
import { getCouponAPI } from 'src/redux/actions/getCoupons';
import ToggleTabs from 'src/components/list/ToggleTab';

const SubscriptionPlanScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const { response: plans, loading } = useAppSelector(
    (state) => state.getPlans
  );
  console.log(JSON.stringify(plans));

  const [selectedItem, setSelectedItem] = React.useState<DataEntity | null>(
    null
  );
  const { response: couponList } = useAppSelector((state) => state.coupons);
  const filteredCoupons = couponList?.data?.filter(
    (coupon) => coupon.plan_id === '0' || coupon.plan_id === selectedItem?._id
  );
  const [couponModal, setCouponModal] = useState(false);
  const [coupon, setCoupon] = useState<any>(null);
  const [durationTab, setTab] = useState('Month');

  React.useEffect(() => {
    dispatch(getCouponAPI());
  }, []);

  React.useEffect(() => {
    dispatch(getPlans());
  }, []);

  const [fullObj, setFullObj]: any = useState({
    hostData: props?.route?.params?.name,
  });
  const renderVoucher = () => {
    return (
      <TouchableOpacity
        style={styles.voucherButton}
        onPress={() => setCouponModal(true)}
      >
        <View style={styles.voucherView}>
          <Coupon_Icon />
          <Text style={styles.voucherText}>
            {coupon ? coupon.title : translate('applyCoupon')}
          </Text>
        </View>
        {!coupon ? (
          <Right_Arrow height={30} width={30} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setCoupon(null);
              setFullObj({ ...fullObj, coupon: null });
            }}
          >
            <Close_Icon height={30} width={30} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  function handleSub(sub: DataEntity) {
    setSelectedItem(sub);
    setFullObj({ ...fullObj, sub });
    if (coupon && coupon?.plan_id !== '0') setCoupon(null);
  }

  function handleCoupon(coupon: couponListData) {
    if (
      coupon &&
      (coupon.plan_id === '0' || coupon.plan_id === selectedItem?._id)
    ) {
      setFullObj({ ...fullObj, coupon });
      setCoupon(coupon);
    } else {
      Alert.alert(translate('invalidCoupon')); // Notify user
    }
    setCouponModal(false);
  }

  function handleNavigation() {
    // Navigate to the payment screen with updated planData
    let navigationParams: any = {
      planData: fullObj,
      newKey: props?.route?.params?.newKey,
      tax_percentage: plans?.data?.tax_percentage,
    };
    // Only send the coupon if plan_id is "0" or matches the current plan's id
    if (coupon) {
      if (
        coupon?.plan_id === '0' ||
        coupon?.plan_id === navigationParams?.planData.sub?._id
      ) {
        navigationParams.planData.coupon = coupon;
      } else {
        navigationParams.planData.coupon = undefined;
      }
    }
    // Navigate to the payment screen with updated parameters
    navigation.navigate(RouteNames.payNowPage.name, navigationParams);
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.header}>
            <AirKeyHeader onPressBack={navigation.goBack} />
            <Text style={styles.title}>{translate('subscriptionPlan')}</Text>
            <ToggleTabs initialTab={durationTab} onTabChange={(tab) => { setTab(tab); if (tab !== durationTab) setSelectedItem(null) }} />
            <SubscriptionPlansList
              selectedItem={selectedItem}
              onPress={handleSub}
              plans={plans?.data?.subscription_plans ?? []}
              coupon={coupon ?? undefined}
              localCurrencyPrice={plans?.data?.local_currency_price}
              planDuration={durationTab}
            />
            {renderVoucher()}
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <AirKeyButton
            text={translate('choosePlan')}
            disable={selectedItem === null ? true : false}
            buttonStyle={{
              backgroundColor: selectedItem ? Colors.primary_color : 'gray',
            }}
            onPress={() => {
              handleNavigation();
            }}
          />
        </View>
      </View>
      <VoucherModal
        isVisible={couponModal}
        setVisible={setCouponModal}
        data={filteredCoupons ?? []}
        onPress={handleCoupon}
        localCurrencyPrice={plans?.data?.local_currency_price}
      />
    </SafeAreaView>
  );
};

export default SubscriptionPlanScreen;
