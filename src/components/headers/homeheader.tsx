import Colors from "@assets/colors/Colors";
import { fonts } from "@assets/fonts";
import IMAGES from "@assets/images";
import { Close_Icon, ProfileIcon, Search_Icon } from "@assets/images/indexes";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { useNavigation } from "@react-navigation/native";
import RouteNames from "@routeNames";
import { translate } from "@translations/translate";
import React, { useRef } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "src/redux/hooks";

type Props = {
  onPressNotification?: () => void;
  emptySearch?: () => void;
  handleSearch?: (text: string) => void;
  unreadCount?: number;
  searchText?: string;
};
const HomeHeader = ({
  onPressNotification,
  unreadCount,
  handleSearch,
  emptySearch,
  searchText,
}: Props) => {
  const { response: profileDetail } = useAppSelector(
    (state) => state.getOnwerProfile
  );
  const [search, setSearch] = React.useState(false);
  const inputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  return (
    <View style={styles.headerBar}>
      <View style={styles.imageView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(RouteNames.customerProfilePage.name)
          }
          style={styles.imageView}
        >
          {profileDetail?.data.profileImage ? (
            <Image
              source={{ uri: profileDetail?.data.profileImage }}
              style={styles.logo}
            />
          ) : (
            <ProfileIcon height={40} width={40} />
          )}
          {!search ? (
            <Text style={styles.userText}>
              {translate("hi")} {profileDetail?.data.userName}
            </Text>
          ) : (
            <TextInput
              placeholder={translate("search")}
              placeholderTextColor={Colors.grey}
              onChangeText={handleSearch}
              value={searchText}
              style={styles.searchBar}
              ref={inputRef}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.headers}>
        <TouchableOpacity
          onPress={() => {
            setSearch(!search);
            emptySearch && emptySearch();
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }}
          style={styles.closeIcon}
        >
          {search ? <Close_Icon /> : <Search_Icon />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNotification}>
          <ImageBackground
            source={IMAGES.notification_icon}
            style={styles.notification_logo}
          >
            {unreadCount !== 0 && (
              <View style={styles.notificationView}>
                <Text style={styles.cartCount}>{unreadCount}</Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(HomeHeader);
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(2),
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: hp(3),
  },
  logo: { height: 40, width: 40, borderRadius: 36 },
  userText: {
    color: Colors.black,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: fonts.urbanistSemiBold,
  },
  header: { marginHorizontal: "6%" },
  headers: { flexDirection: "row", gap: 5 },
  searchIcon: { height: 27, width: 27 },
  notification_logo: {
    height: 27,
    width: 21,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-end",
  },
  notificationView: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: Colors.error_red,
  },
  cartCount: {
    fontSize: 10,
    color: Colors.white,
    textAlign: "center",
    lineHeight: 12,
    fontFamily: fonts.urbanistBold,
  },
  searchBar: {
    borderRadius: 10,
    width: 150,
    height: 45,
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
  },
  closeIcon: {
    height: hp(4),
    width: hp(4),
  },
});
