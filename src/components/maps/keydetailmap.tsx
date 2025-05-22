import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Image, View, Text } from "react-native";
import { mapMarker } from "@assets/images/indexes";

type Props = {
  mapLocation?: { latitude: number; longitude: number } | null;
};

const KeyDetailMap = ({ mapLocation }: Props) => {
  const windowHeight = Dimensions.get("window").height;
  // Check if mapLocation is valid
  if (!mapLocation || !mapLocation.latitude || !mapLocation.longitude) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Location data is unavailable</Text>
      </View>
    );
  }

  return (
    <MapView
      style={[styles.map, { height: windowHeight * 0.27 }]}
      initialRegion={{
        latitude: mapLocation?.latitude,
        longitude: mapLocation?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: mapLocation?.latitude,
          longitude: mapLocation?.longitude,
        }}
      >
        <Image source={mapMarker} style={styles.marker} />
      </Marker>
    </MapView>
  );
};

export default KeyDetailMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
  },
  marker: {
    height: 30,
    width: 30,
  },
  errorContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
