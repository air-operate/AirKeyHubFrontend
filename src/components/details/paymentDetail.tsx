import Colors from '@assets/colors/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PaymentDetailsProps {
  subscriptionAmount: number;
  // taxAmount: number;
  couponAmount?: number;
  totalAmount: number;
  currencyCode?: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  subscriptionAmount,
  // taxAmount,
  couponAmount = 0,
  totalAmount,
  currencyCode,
}) => {
  return (
    <View style={styles.paymentDetailsContainer}>
      {/* Subscription Amount */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Subscription Amount:</Text>
        <Text style={styles.detailValue}>
          {subscriptionAmount.toFixed(2)} {currencyCode}
        </Text>
      </View>
      <Text style={styles.detailLabel}>(including tax)</Text>

      {/* Tax Amount */}
      {/* <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tax Amount:</Text>
        <Text style={styles.detailValue}>
          {taxAmount.toFixed(2)} {currencyCode}
        </Text>
      </View> */}

      {/* Coupon Discount (conditionally rendered if exists) */}
      {couponAmount > 0 && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Coupon Discount:</Text>
          <Text style={[styles.detailValue, styles.couponText]}>
            -{couponAmount.toFixed(2)} {currencyCode}
          </Text>
        </View>
      )}

      {/* Total Amount */}
      <View style={[styles.detailRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>
          {totalAmount.toFixed(2)} {currencyCode}
        </Text>
      </View>
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  paymentDetailsContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginHorizontal: 3,
    marginVertical: 20,
    elevation: 2, // Shadow for Android
    shadowColor: Colors.black, // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.black,
    // color: Colors.text_primary,
  },
  couponText: {
    color: Colors.black,
    // color: Colors.discount_color,
  },
  totalRow: {
    borderTopWidth: 1,
    // borderTopColor: Colors.border_light,
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary_color,
  },
});
