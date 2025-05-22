import Colors from '@assets/colors/Colors';
import IMAGES from '@assets/images';
import { Right_Arrow, Voucher_List_Icon } from '@assets/images/indexes';
import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getData } from 'src/asyncstorage';
import { couponListData } from 'src/typings/global';

type Props = {
  data: couponListData[];
  onPress: (item: couponListData) => void;
  localCurrencyPrice?: number;
};

const VoucherList = ({ data, onPress, localCurrencyPrice }: Props) => {
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
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.gap}
      renderItem={({ item }) => {
        console.log(item);
        return (
          <TouchableOpacity
            onPressOut={() => onPress(item)}
            style={styles.shadowContainer}
          >
            <ImageBackground
              source={IMAGES.voucher_container}
              style={styles.mainContainer}
            >
              <View style={styles.container}>
                <Voucher_List_Icon />
                <View>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.codeText} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </View>
              {/* <View> */}
              <Text style={styles.titleText}>
                {item.coupon_type === 1
                  ? `${Number(item.coupon_amount) * 1} ${'GBP'}`
                  : `${item.coupon_amount}%`}
              </Text>
              {/* </View> */}
              {/* <Right_Arrow /> */}
            </ImageBackground>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default VoucherList;

const styles = StyleSheet.create({
  mainContainer: {
    height: heightPercentageToDP(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(3.5),
  },
  gap: { gap: 10, marginVertical: heightPercentageToDP(1) },
  container: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    lineHeight: 18,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.black,
    lineHeight: 14.4,
    width: widthPercentageToDP(60),
  },
  shadowContainer: {
    shadowColor: Colors.black,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
