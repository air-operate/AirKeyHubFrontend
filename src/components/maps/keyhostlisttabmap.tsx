import { mapMarker } from '@assets/images/indexes';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { IRegion } from '@interfaces/keydetail';
import { KeyHost } from 'src/typings/global';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import MapView from 'react-native-map-clustering';
import { MapView as RNMapView } from 'react-native-maps'; 

type props = {
  region: IRegion;
  hostLocations?: KeyHost[];
  onPressMarker?: (item: KeyHost) => void;
  setRegion: React.Dispatch<React.SetStateAction<IRegion>>;
  isSearchActive: boolean;
  shouldAnimateToRegion: boolean;
  setShouldAnimateToRegion: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeyHostListingTabMap = ({
  region,
  hostLocations,
  onPressMarker,
  setRegion,
  isSearchActive,
  shouldAnimateToRegion,
  setShouldAnimateToRegion
}: props) => {
  const windowHeight = Dimensions.get('window').height;
  // const mapRef = useRef<MapView>(null);
  const mapRef = useRef<RNMapView>(null);
  // const [shouldAnimateToRegion, setShouldAnimateToRegion] = React.useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     mapRef?.current?.animateToRegion(region, 1000);
  //   }, 500);
  // }, [region]);

  

  useEffect(() => {
    if (shouldAnimateToRegion) {
      mapRef?.current?.animateToRegion(region, 1000);
      // optionally reset it back so user interaction doesn't get overridden
      setTimeout(() => {
        // call a prop to reset
        setShouldAnimateToRegion(false);
      }, 1500);
    }
  }, [region, shouldAnimateToRegion]);
  console.log({ isSearchActive });
  return (
    <View pointerEvents={isSearchActive ? 'none' : 'auto'}>
      {isSearchActive ? null: (
        <MapView
          ref={mapRef}
          style={[styles.map, { height: '100%' }]}
          initialRegion={region}
          onRegionChangeComplete={(reg) => {
            setRegion(reg);
          }}
          // showsUserLocation={true}
          mapPadding={{
            bottom: heightPercentageToDP(40),
            top: 0,
            right: 0,
            left: 0,
          }}
        >
          {hostLocations?.length
            ? hostLocations?.map((item) => {
                return (
                  <Marker
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    onPress={() => {
                      onPressMarker && onPressMarker(item);
                      // mapRef?.current?.animateToRegion({
                      //   ...region,
                      //   latitude: item.latitude,
                      //   longitude: item.longitude,
                      // });
                      console.log(item);
                    }}
                  >
                    <Image source={mapMarker} style={styles.marker} />
                  </Marker>
                );
              })
            : null}
        </MapView>
      )}
    </View>
  );
};

export default KeyHostListingTabMap;

const styles = StyleSheet.create({
  map: {
    width: '100%',
  },
  marker: { height: 33, width: 33 },
});
