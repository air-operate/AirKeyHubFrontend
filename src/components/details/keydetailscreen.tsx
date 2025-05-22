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
import { KeyDetailResponse } from "src/typings/global";
type Props = {
  detailResponse?: KeyDetailResponse["data"];
};
const KeyDetail = (props: Props) => {
  const { detailResponse } = props;
  const [expanded, setExpanded] = React.useState(false);

  let statusColor = "";
  let statusName = "";
  switch (detailResponse?.key_status) {
    case 0:
      statusColor = "#FE9E2D";
      statusName = "Waiting dropoff";
      break;
    case 1:
      statusColor = "green";
      statusName = "In Keybox";
      break;
    case 2:
      statusColor = "red";
      statusName = "Not In Keybox";
      break;
  }
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

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={styles.header}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          {detailResponse?.description || ""}
        </Text>
      </View>
      {detailResponse?.store_name ? (
        <>
          <Text style={styles.title}>{translate("host")}</Text>
          <View style={styles.centerSection}>
            <View style={styles.innerSection}>
              <Text style={styles.name}>{detailResponse?.store_name}</Text>
              <View style={styles.innerSection}>
                <TouchableOpacity style={styles.directionButton}>
                  <Direction_Icon />
                  <TouchableOpacity
                    onPress={() =>
                      navigateToGoogleDirection(
                        detailResponse?.latitude?.toString() || "",
                        detailResponse?.longitude?.toString() || ""
                      )
                    }
                  >
                    <Text style={styles.directionText}>
                      {translate("direction")}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.innerSection}>
              <View style={styles.innerSection}>
                <Location_Icon />
                <Text style={styles.address}>
                  {detailResponse?.address || ""}
                </Text>
              </View>
            </View>
            <Text
              style={styles.keyHostDescription}
              numberOfLines={expanded ? undefined : 3}
            >
              {detailResponse?.store_info || ""}
            </Text>
            {detailResponse?.store_info &&
              detailResponse?.store_info?.length > 100 && (
                <TouchableOpacity onPress={toggleExpansion}>
                  <Text style={styles.learnMore}>
                    {translate(expanded ? "readLess" : "readMore")}
                  </Text>
                </TouchableOpacity>
              )}
            <View style={styles.divider} />
            <View style={styles.innerSection}>
              <Text style={styles.name}>{translate("emailAddress")}</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:${detailResponse?.email || ""}`)
                }
              >
                <Text style={styles.email}>{detailResponse?.email || ""}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.innerSection}>
              <Text style={styles.name}>{translate("phoneNumber")}</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${detailResponse?.phone_number || ""}`)
                }
              >
                <Text style={styles.email}>
                  {detailResponse?.phone_number || ""}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.innerSection}>
              <Text style={styles.name}>{translate("keyStatus")}</Text>
              <View style={styles.statusView}>
                <View
                  style={[
                    styles.availableView,
                    { backgroundColor: statusColor },
                  ]}
                />
                <Text style={styles.email}>{statusName || ""}</Text>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default memo(KeyDetail);

const styles = StyleSheet.create({
  header: { marginHorizontal: "6%", marginTop: "2.4%" },
  footer: { marginHorizontal: "6%", paddingBottom: "5%" },
  map: {
    width: "100%",
  },
  title: {
    fontSize: 19,
    lineHeight: 22.8,
    letterSpacing: 0.5,
    color: Colors.black,
    fontFamily: fonts.urbanistSemiBold,
    marginTop: hp(1.5),
  },
  description: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    marginVertical: "2%",
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: "#696F74",
    fontFamily: fonts.urbanistMedium,
  },
  centerSection: {
    backgroundColor: Colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    borderRadius: 8,
    elevation: 2,
    marginVertical: 5,
    gap: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  innerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
  },
  name: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 14.4,
    fontFamily: fonts.urbanistBold,
  },
  email: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: fonts.urbanistMedium,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.urbanistMedium,
    marginTop: -5,
    color: "rgba(105, 111, 116, 1)",
  },
  direction: {
    fontSize: 14,
    fontFamily: fonts.urbanistRegular,
    color: Colors.black,
    textDecorationLine: "underline",
  },
  divider: {
    borderBottomWidth: Platform.OS === "android" ? 1 : 0.5,
    borderStyle: Platform.OS === "android" ? "dotted" : "solid",
    marginTop: "3%",
    marginBottom: "2%",
    borderColor: Colors.grey,
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
  directionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(2.3),
    borderRadius: 10,
    gap: 2,
  },
  directionText: {
    fontSize: 14,
    fontFamily: fonts.urbanistItalic,
    color: Colors.black,
    textDecorationLine: "underline",
  },
  keyHostDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#696F74",
    lineHeight: 16,
    fontFamily: fonts.urbanistItalic,
  },
  button: {
    backgroundColor: "#EDF1F3",
    paddingVertical: hp(1),
    borderRadius: hp(3),
    paddingHorizontal: hp(2.5),
    marginTop: hp(0.5),
    marginBottom: hp(0.1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 11,
    color: Colors.black,
    lineHeight: 10.56,
    fontFamily: fonts.urbanistSemiBold,
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
