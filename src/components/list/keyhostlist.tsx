import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { Location_Icon } from "@assets/images/indexes";
import { KeyHost } from "src/typings/global";
import { translate } from "@translations/translate";

type Props = {
  hostLocations?: KeyHost[];
  onPress: (item: KeyHost) => void;
};

const KeyHostList = ({ hostLocations, onPress }: Props) => {
  if (hostLocations && hostLocations?.length < 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.zeroHost}>{translate("noHost")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={hostLocations}
      contentContainerStyle={styles.gap}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(item)}
          >
            <View style={styles.header}>
              <View style={styles.locationView}>
                <Text style={styles.name}>{item.user_name}</Text>
                <View style={styles.centerSection}>
                  <Location_Icon />
                  <Text style={styles.description}>{item.address}</Text>
                </View>
              </View>
              {item?.active_time && (
                <Text
                  style={styles.timeText}
                >{`${item.active_time.from} to ${item.active_time.to}`}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default KeyHostList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.app_white,
    marginHorizontal: wp(5),
    elevation: 3,
    borderRadius: 8,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  gap: {
    gap: 10,
    paddingBottom: hp(17),
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationView: { gap: 5 },
  centerSection: { flexDirection: "row", alignItems: "center", gap: 3 },
  name: {
    color: Colors.black,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16.59,
  },
  description: {
    color: "#696F74",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 9.6,
  },
  timeText: {
    color: Colors.black,
    fontWeight: "500",
    fontSize: 9,
    backgroundColor: "#EDF1F3",
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.7),
    borderRadius: 10,
  },
  emptyContent: { justifyContent: "center", alignItems: "center", flex: 1 },
  zeroHost: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    paddingHorizontal: "10%",
    textAlign: "center",
    color: Colors.black,
  },
});
