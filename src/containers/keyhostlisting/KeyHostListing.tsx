import { useNavigation } from '@react-navigation/native';
import { translate } from '@translations/translate';
import React, { useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, View } from 'react-native';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import KeyHostToggle, { toggle } from 'src/components/buttons/keyhostToggle';
import KeyHostList from 'src/components/list/keyhostlist';
import KeyHostModal from 'src/components/modal/keyhostmodal';
import { searchBoxStyle, styles } from './Styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Loader } from 'src/components/loader/loader';
import ResponseModal from 'src/components/modal/responseModal';
import { notifyStateReset } from 'src/redux/slices/notify';
import KeyHostListingTabMap from 'src/components/maps/keyhostlisttabmap';
import { IRegion } from '@interfaces/keydetail';
import GetLocation from 'react-native-get-location';
import { getKeyHosts } from 'src/redux/actions/getKeyHosts';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '@assets/colors/Colors';

const KeyHostListingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.getKeyHosts);
  const {
    response: notifyResp,
    loading: notifyLoading,
    error: notifyError,
  } = useAppSelector((state) => state.notifyOwner);

  const [selectedToggle, setSelectedToggle] = React.useState(toggle[1]);
  const [hostDetail, setHostDetail] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [region, setRegion] = React.useState<IRegion>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [shouldAnimateToRegion, setShouldAnimateToRegion] = React.useState(false);

  React.useEffect(() => {
    setLoader(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        setRegion({
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, []);

  console.log(region);
  React.useEffect(() => {
    const mapHeight = Dimensions.get('window').height;
    const metersPerPixel = region.latitudeDelta * 100 * Math.PI;
    const radiusInMeters = (mapHeight * metersPerPixel) / 2;
    const params = {
      radius: radiusInMeters,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    dispatch(getKeyHosts(params));
  }, [region]);

  const closeModal = () => {
    setVisible(false);
  };
  const [keyHostVisibility, setKeyHostVisibility] = React.useState(false);
  const handlePressMarker = (item: any) => {
    setHostDetail(item);
    setKeyHostVisibility(true);
  };

  useEffect(() => {
    dispatch(notifyStateReset());
  }, []);
  useEffect(() => {
    if (notifyResp) {
      Alert.alert(notifyResp);
      dispatch(notifyStateReset());
    }
    if (notifyError) {
      Alert.alert(notifyError.data);
      dispatch(notifyStateReset());
    }
  }, [notifyResp, notifyError]);

  const onPlaceSelected = async (place: any) => {
    try {
      console.log({ place });

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=AIzaSyAWOGKKJ01--AqYq9Rgor10wwRf9Oh6Slc`
      );
      console.log({ response });

      const { result } = response.data;
      if (result.geometry && result.geometry.location) {
        const { lat, lng } = result.geometry.location;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.22,
          longitudeDelta: 0.09,
        });
        setShouldAnimateToRegion(true);
      } else {
      }
    } catch (error) {}
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={notifyLoading} />
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <AirKeyHeader
              text={translate('keyHostListing')}
              onPressBack={() => navigation.goBack()}
            />
            <KeyHostToggle
              selectedToggle={selectedToggle}
              setSelectedToggle={setSelectedToggle}
            />
            <GooglePlacesAutocomplete
              placeholder='Search Store'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                onPlaceSelected(details);
                setIsSearchActive(false);
              }}
              query={{
                key: 'AIzaSyAWOGKKJ01--AqYq9Rgor10wwRf9Oh6Slc',
                language: 'en',
              }}
              styles={searchBoxStyle}
              fetchDetails={true}
              textInputProps={{
                onFocus: () => setIsSearchActive(true),
                onChangeText: (text) => {
                  if (text === '') {
                    setIsSearchActive(false);
                  }
                },
                onBlur: () => {
                  console.log('blur');
                  setIsSearchActive(false);
                },
                placeholderTextColor: Colors.grey,
              }}
              keyboardShouldPersistTaps='handled'
            />
          </View>
          {selectedToggle.name === 'Map' ? (
            <KeyHostListingTabMap
              region={region}
              setRegion={setRegion}
              hostLocations={response?.data}
              onPressMarker={(item) => {
                handlePressMarker(item);
              }}
              isSearchActive={isSearchActive}
              shouldAnimateToRegion={shouldAnimateToRegion}
              setShouldAnimateToRegion={setShouldAnimateToRegion}
            />
          ) : (
            <KeyHostList
              hostLocations={response?.data}
              onPress={handlePressMarker}
            />
          )}
        </View>
      </View>
      <KeyHostModal
        keyHostVisibility={keyHostVisibility}
        setKeyHostVisibility={setKeyHostVisibility}
        hostDetail={hostDetail}
        navigation={navigation}
        button
      />
      <ResponseModal
        visible={visible}
        message={notifyResp}
        closeModal={closeModal}
        setVisible={setVisible}
      />
    </SafeAreaView>
  );
};

export default KeyHostListingScreen;
