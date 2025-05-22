import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '@assets/colors/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { fonts } from '@assets/fonts';
import { translate } from '@translations/translate';

type Props = {
  data?: any;
  onPressCancel?: () => void;
  onPressRenew?: () => void;
  subscription?: boolean;
};
const SubscriptionCard = ({ data, onPressCancel, onPressRenew }: Props) => {
  let date = new Date();
  let expiryDate = new Date(data?.subscriptionExpriyString * 1000);
  function convertTimestampToDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{translate('subscriptionPlan')}</Text>
      <View style={[styles.container]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{data?.plan_title} Plan</Text>
          <View style={styles.rowView}>
            <Text style={styles.subTest}>
              {expiryDate < date
                ? 'Plan expired'
                : translate(
                    data?.subscription_status
                      ? 'nextBillingDate'
                      : 'planExpireOn'
                  )}
            </Text>
            <Text style={styles.description}>
              {/* {data?.plan_price} {data.currency.toUpperCase()}/{data?.timePeriod} */}
              {convertTimestampToDate(data?.subscriptionExpriyString)}
            </Text>
          </View>
          {data?.subscription_status && expiryDate > date ? (
            <TouchableOpacity onPress={onPressCancel}>
              <Text style={[styles.description, styles.cancelButton]}>
                {translate('cancelSub')}
              </Text>
            </TouchableOpacity>
          ) : (
            expiryDate < date && (
              <TouchableOpacity onPress={onPressRenew}>
                <Text style={[styles.description, styles.cancelButton]}>
                  {/* {translate('cancelSub')} */}
                  {'Renew Subscription'}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: hp(3),
    marginVertical: hp(1.5),
  },
  container: {
    backgroundColor: Colors.white,
    elevation: 3,
    paddingVertical: hp(1.6),
    paddingHorizontal: hp(1.3),
    borderRadius: 8,
    marginVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
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
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
  },
  cancelButton: {
    marginTop: hp(1),
    color: Colors.error_red,
  },
  subTest: {
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
    fontSize: 14,
  },
});
