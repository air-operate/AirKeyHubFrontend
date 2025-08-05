import Colors from '@assets/colors/Colors';
import { fonts } from '@assets/fonts';
import { Key_Icon, Right_Direction } from '@assets/images/indexes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@assets/sizes/Sizes';
import RouteNames from '@routeNames';
import { translate } from '@translations/translate';
import React from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getKeyCatalog } from 'src/redux/actions/getKeyCatalog';
import { useAppDispatch } from 'src/redux/hooks';
import { Loader } from '../loader/loader';

type Props = {
  loading: boolean;
  data: any;
  navigation: any;
};
const KeyCatalogList = (props: Props) => {
  const { data, navigation, loading } = props;
  const dispatch = useAppDispatch();
  let statusColor = '';
  let statusName = '';

  const refreshControl = () => {
    dispatch(getKeyCatalog());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={{ marginBottom: hp(12), flex: 1, marginTop: 10 }}>
      {data && data?.length !== 0 ? (
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={styles.gap}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshControl} />
          }
          renderItem={({ item }) => {
            switch (item.status) {
              case 0:
                statusColor = '#FE9E2D';
                statusName = 'Waiting dropoff';
                break;
              case 1:
                statusColor = 'green';
                statusName = 'In Keybox';
                break;
              case 2:
                statusColor = 'red';
                statusName = 'Not In Keybox';
                break;
            }
            const goToDetail = () => {
              if (item.subscription_active_status === 'active') {
                navigation.navigate(RouteNames.keyDetailPage.name, {
                  keyId: item._id,
                });
              } else if (
                item.subscription_active_status === 'canceled'
                // !item.stripe_subscription_status
              ) {
                navigation.navigate(RouteNames.keyDetailPage.name, {
                  keyId: item._id,
                });
              // } else if (
              //   item.subscription_active_status === 'canceled' &&
              //   item.stripe_subscription_status
              // ) {
              //   Alert.alert(
              //     'Your subscription has been canceled. Access to your key is no longer available.'
              //   );
              } else {
                Alert.alert(
                  'Your payment is incomplete. Access to your key will be available once the payment is complete.'
                );
              }
            };
            return (
              <TouchableOpacity style={styles.container} onPress={goToDetail}>
                <View style={styles.header}>
                  <Key_Icon />
                  <View style={styles.statusView}>
                    <View
                      style={[styles.bullet, { backgroundColor: statusColor }]}
                    />

                    <Text style={styles.status}>{statusName}</Text>
                  </View>
                </View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <TouchableOpacity
                  style={styles.rightArrow}
                  onPress={goToDetail}
                >
                  <Right_Direction />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noKeys}>
          <Text style={styles.noKeysText}>{translate('notKeyAvailable')}</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(KeyCatalogList);
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: '2%',
    paddingHorizontal: '3%',
    elevation: 3,
    marginRight: 10,
    width: wp(42.5),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  gap: { gap: 10, paddingVertical: 18 },
  name: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 15,
    marginTop: hp(1.2),
    fontFamily: fonts.urbanistBold,
  },
  description: {
    color: Colors.grey,
    fontSize: 11,
    lineHeight: 10.8,
    marginTop: hp(0.3),
    fontFamily: fonts.urbanistMedium,
  },
  status: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 11,
    fontFamily: fonts.urbanistRegular,
  },
  statusView: {
    backgroundColor: Colors.app_white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 18,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  bullet: {
    height: 4,
    width: 4,
    borderRadius: 4,
    marginLeft: 4,
  },
  rightArrow: { alignSelf: 'flex-end' },
  noKeys: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  noKeysText: {
    textAlign: 'center',
    color: Colors.primary_color,
    fontFamily: fonts.urbanistSemiBold,
    fontSize: hp(2.4),
  },
});
