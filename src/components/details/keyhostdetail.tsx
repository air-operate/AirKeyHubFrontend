import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import { Direction_Icon, Location_Icon } from "@assets/images/indexes";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import { translate } from "@translations/translate";
import React, { memo, useCallback } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyHost } from "src/typings/global";

type Props = {
  hostDetail?: KeyHost;
};
const KeyHostDetail = ({ hostDetail }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const navigateToGoogleDirection = useCallback(
    (lat?: string, long?: string) => {
      let url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${long}&dirflg=d`,
        android: `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=driving&dir_action=navigate`,
      });
      Linking.openURL(url ?? "");
    },
    []
  );
  return (
    <View style={styles.centerSection}>
      <View style={styles.innerSection}>
        <Text style={styles.name}>{hostDetail?.store_name}</Text>
        <TouchableOpacity
          style={styles.direction}
          onPressOut={() => {
            navigateToGoogleDirection(
              hostDetail?.latitude.toString(),
              hostDetail?.longitude.toString()
            );
          }}
        >
          <Direction_Icon />
          <Text style={styles.directionText}>{translate("direction")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerSection}>
        <TouchableOpacity style={styles.innerSection}>
          <Location_Icon />
          <Text style={styles.address}>{hostDetail?.address}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.keyHostDescription}
        numberOfLines={expanded ? undefined : 3}
      >
        {hostDetail?.store_info}
      </Text>
      {hostDetail?.store_info && hostDetail?.store_info.length > 100 && (
        <TouchableOpacity onPressOut={toggleExpansion}>
          <Text style={styles.learnMore}>
            {translate(expanded ? "readLess" : "readMore")}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.divider} />
      <View style={styles.innerSection}>
        <Text style={styles.name}>{translate("emailAddress")}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${hostDetail?.email}`)}
        >
          <Text style={styles.email}>{hostDetail?.email}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerSection}>
        <Text style={styles.name}>{translate("phoneNumber")}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${hostDetail?.phone_number}`)}
        >
          <Text style={styles.email}>
            +{hostDetail?.country_code} {hostDetail?.phone_number}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(KeyHostDetail);

const styles = StyleSheet.create({
  map: {
    width: "100%",
  },
  centerSection: {
    backgroundColor: Colors.white,
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    borderRadius: 8,
    elevation: 2,
    marginVertical: 10,
    gap: 5,
    marginTop: hp(4),
    shadowColor: Colors.grey,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  innerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 2,
    gap: 5,
  },
  name: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 14.4,
    fontFamily: fonts.urbanistBold,
  },
  email: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
  },
  address: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(105, 111, 116, 1)",
    fontFamily: fonts.urbanistMedium,
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(2.3),
    paddingVertical: hp(0.6),
    borderRadius: 10,
    gap: 2,
  },
  time: {
    fontSize: 9,
    fontWeight: "500",
    color: Colors.black,
    backgroundColor: "rgba(237, 241, 243, 1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  divider: {
    borderBottomWidth: Platform.OS === "android" ? 1 : 0.5,
    borderStyle: Platform.OS === "android" ? "dotted" : "solid",
    marginTop: "3%",
    marginBottom: "2%",
    borderColor: Colors.grey,
  },
  keyHostDescription: {
    fontSize: 12,
    color: Colors.grey,
    lineHeight: 16,
    fontFamily: fonts.urbanistItalic,
  },
  directionText: {
    fontSize: 12,
    color: Colors.black,
    textDecorationLine: "underline",
    fontFamily: fonts.urbanistRegular,
  },
  button: {
    backgroundColor: "#EDF1F3",
    paddingVertical: hp(1.3),
    borderRadius: hp(3),
    paddingHorizontal: hp(2.5),
    marginVertical: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.black,
    lineHeight: 10.56,
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  availableView: {
    height: 5,
    width: 5,
    borderRadius: 5,
    // backgroundColor: "rgba(81, 214, 0, 1)",
  },
  learnMore: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary_color,
    lineHeight: 16,
    fontFamily: fonts.urbanistItalic,
    textDecorationLine: "underline",
  },
});
