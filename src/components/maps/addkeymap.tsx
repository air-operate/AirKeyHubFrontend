import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { IRegion } from "@interfaces/keydetail";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import Colors from "@assets/colors/Colors";
import { getKeyHosts } from "src/redux/actions/getKeyHosts";
import { useAppDispatch } from "src/redux/hooks";
import { KeyHost } from "src/typings/global";
import GetLocation from "react-native-get-location";
import { Loader } from "../loader/loader";

type Props = {
  radius: number;
  onPressMarker: (item: any) => void;
  hostLocations: KeyHost[];
};

const AddKeyMap = (props: Props) => {
  const dispatch = useAppDispatch();

  const [region, setRegion] = useState<IRegion>({
    latitude: 30.785834,
    longitude: -1.4,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [loader, setLoader] = useState(true);
  const { radius, onPressMarker, hostLocations } = props;

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 6000,
        });
        setRegion({
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching location: ", error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const params = {
      radius: radius,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    dispatch(getKeyHosts(params));
  }, [region, radius]);

  if (loader) {
    return <Loader />;
  }

  return (
    <View style={styles.slide}>
      <MapView
        style={[styles.map, { height: Dimensions.get("window").height * 0.6 }]}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
      >
        {hostLocations?.map((item) => (
          <Marker
            key={item._id}
            onPress={() => onPressMarker(item)}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        ))}
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={radius}
          fillColor="rgba(0, 0, 0, 0.11)"
          strokeColor={Colors.primary_color}
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
};

export default AddKeyMap;

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: wp(100),
  },
});
