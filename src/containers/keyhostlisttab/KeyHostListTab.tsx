import { translate } from '@translations/translate';
import React, { useCallback, useState } from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import KeyHostToggle, { toggle } from 'src/components/buttons/keyhostToggle';
import KeyHostList from 'src/components/list/keyhostlist';
import KeyHostListingTabMap from 'src/components/maps/keyhostlisttabmap';
import { IRegion } from '@interfaces/keydetail';
import { searchBoxStyle, styles } from './Styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getKeyHosts } from 'src/redux/actions/getKeyHosts';
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location/dist';
import { Loader } from 'src/components/loader/loader';
import KeyHostModal from 'src/components/modal/keyhostmodal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import Colors from '@assets/colors/Colors';

const KeyHostListTabScreen = () => {
  const [selectedToggle, setSelectedToggle] = React.useState(toggle[1]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { response } = useAppSelector((state) => state.getKeyHosts);

  const [hostDetail, setHostDetail] = React.useState();
  const [keyHostVisibility, setKeyHostVisibility] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [region, setRegion] = React.useState<IRegion>({
    latitude: 37.7749,
    longitude: -2.4194,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0121,
  });
  const [shouldAnimateToRegion, setShouldAnimateToRegion] = React.useState(false);

  React.useEffect(() => {
    getUserLocation();
  }, []);

  React.useEffect(() => {
    getHosts();
  }, [region]);

  const getUserLocation = useCallback(async () => {
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

  const getHosts = useCallback(async () => {
    const mapHeight = Dimensions.get('window').height;
    const metersPerPixel = region.latitudeDelta * 100 * Math.PI;
    const radiusInMeters = (mapHeight * metersPerPixel) / 2;
    console.log(region, radiusInMeters);
    const params = {
      radius: radiusInMeters,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    await dispatch(getKeyHosts(params));
  }, [region]);

  const handlePressMarker = useCallback((item: any) => {
    setHostDetail(item);
    setKeyHostVisibility(true);
  }, []);

  const onPlaceSelected = async (place: any) => {
    console.log({ place });

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=AIzaSyAWOGKKJ01--AqYq9Rgor10wwRf9Oh6Slc`
      );
      const { result } = response.data;

      if (result.geometry && result.geometry.location) {
        const { lat, lng } = result.geometry.location;
        console.log({ lat, lng });
        setTimeout(() => {
          setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.22,
            longitudeDelta: 0.21,
          });
          setShouldAnimateToRegion(true)
        }, 100);
      } else {
      }
    } catch (error) {}
  };
  const [isSearchActive, setIsSearchActive] = useState(false);
  if (loader) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <Text style={styles.title}>{translate('keyHostNear')}</Text>
          <KeyHostToggle
            selectedToggle={selectedToggle}
            setSelectedToggle={setSelectedToggle}
          />
        </View>
        <GooglePlacesAutocomplete
          placeholder='Search Store'
          onPress={(data, details = null) => {
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
              } else {
                // console.log(text);
                // setIsSearchActive(true);
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
      <View style={styles.footer}>
        {selectedToggle.name === 'Map' ? (
          <KeyHostListingTabMap
            setRegion={setRegion}
            region={region}
            hostLocations={response?.data}
            onPressMarker={(item) => {
              handlePressMarker(item);
            }}
            isSearchActive={isSearchActive}
            setShouldAnimateToRegion={setShouldAnimateToRegion}
            shouldAnimateToRegion={shouldAnimateToRegion}
          />
        ) : (
          <KeyHostList
            hostLocations={response?.data}
            onPress={(item) => {
              handlePressMarker(item);
            }}
          />
        )}
      </View>
      <KeyHostModal
        keyHostVisibility={keyHostVisibility}
        setKeyHostVisibility={setKeyHostVisibility}
        hostDetail={hostDetail}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default KeyHostListTabScreen;
