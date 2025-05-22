import Colors from '@assets/colors/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VoucherList from '../list/voucherList';
import CustomModal from '../atom/CustomModal';
import { translate } from '@translations/translate';
import { fonts } from '@assets/fonts';
import { couponListData } from 'src/typings/global';

type Props = {
  isVisible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: couponListData[];
  onPress: (item: any) => void;
  localCurrencyPrice?: number;
};
const VoucherModal = ({
  isVisible,
  setVisible,
  data,
  onPress,
  localCurrencyPrice,
}: Props) => {
  return (
    <CustomModal visible={isVisible} closeModal={() => setVisible(false)}>
      <Text style={styles.text}>{translate('voucherList')}</Text>
      <VoucherList
        data={data ?? []}
        onPress={onPress}
        localCurrencyPrice={localCurrencyPrice}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.error_red,
  },
  text: {
    fontSize: 19,
    color: Colors.black,
    textAlign: 'center',
    fontFamily: fonts.urbanistSemiBold,
    marginTop: 20,
  },
});

export default VoucherModal;
