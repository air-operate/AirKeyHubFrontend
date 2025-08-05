import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@assets/colors/Colors';
import { DataEntity, couponListData } from 'src/typings/global';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { fonts } from '@assets/fonts';
import { getData } from 'src/asyncstorage';

type props = {
  selectedItem: DataEntity | null;
  plans: DataEntity[];
  onPress: (item: any) => void;
  coupon?: couponListData;
  localCurrencyPrice?: number;
  planDuration?: string;
};

const SubscriptionPlansList = (props: props) => {
  const { selectedItem, plans, onPress, coupon, localCurrencyPrice, planDuration } = props;
  // const [currencyCode, setCurrencyCode] = useState('GBP');

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const data = await getData('local_currency');
  //     console.log({ data });
  //     if (data) {
  //       setCurrencyCode(data);
  //     } else {
  //       setCurrencyCode('GBP');
  //     }
  //   };
  //   getUserData();
  // }, []);
  function updatedPrice(price: any, subId: string) {
    if (coupon) {
      // Apply the coupon if plan_id is "0" or matches the subId
      if (coupon.plan_id === '0' || coupon.plan_id === subId) {
        if (coupon.coupon_type === 1) {
          let discountedPrice = price - parseFloat(coupon.coupon_amount);
          if (discountedPrice < 0) {
            return (0).toFixed(2);
          } else {
            return discountedPrice.toFixed(2);
          }
        } else if (coupon.coupon_type === 2) {
          let discountedPrice =
            price - (parseFloat(coupon.coupon_amount) * price) / 100;
          return discountedPrice.toFixed(2);
        }
      }
    }

    // If no coupon is applicable or coupon.plan_id doesn't match subId
    return Number(price).toFixed(2);
  }

  return (
    <FlatList
      data={plans}
      contentContainerStyle={styles.gap}
      renderItem={({ item }) => {
        if (item.type?.toString().toLowerCase() !== planDuration?.toLowerCase())
          return null;
        const isSelected = selectedItem && selectedItem._id === item._id;

        return (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={[
              styles.container,
              // updatedPrice(item?.total_price, item._id) !==
              //   item.total_price && { borderWidth: 1 },
            ]}
          >
            <View>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.description}>
                {updatedPrice(item?.total_price, item._id)}{' '}
                {'GBP'}/
                {item?.timePeriod}
                {item?.type}
              </Text>
            </View>
            {isSelected ? (
              <View style={styles.selectedCheckBox}>
                <View style={styles.innerView} />
              </View>
            ) : (
              <View style={styles.checkBox} />
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default SubscriptionPlansList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    marginHorizontal: 0.3,
    marginTop: 1,
    shadowColor: Colors.black,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gap: { gap: 6, marginTop: hp(1.5) },
  title: {
    fontSize: 19,
    lineHeight: 22.8,
    letterSpacing: 0.5,
    color: Colors.black,
    fontFamily: fonts.urbanistSemiBold,
  },
  description: {
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: 0.5,
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
  },
  checkBox: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  selectedCheckBox: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: Colors.primary_color,
  },
});
