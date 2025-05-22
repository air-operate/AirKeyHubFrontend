import Colors from "@assets/colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React, { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IToggle } from "@interfaces/addkey";
export const toggle = [
  { id: 1, name: "List" },
  { id: 2, name: "Map" },
];

type props = {
  selectedToggle: IToggle;
  setSelectedToggle: React.Dispatch<React.SetStateAction<IToggle>>;
};

const KeyHostToggle = (props: props) => {
  const { selectedToggle, setSelectedToggle } = props;
  const handleTogglePress = useCallback((item: IToggle) => {
    setSelectedToggle(item);
  }, []);

  return (
    <View style={styles.container}>
      {toggle.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === toggle.length - 1;
        const buttonStyle = {
          backgroundColor:
            selectedToggle.id === item.id ? Colors.primary_color : "white",
          borderTopLeftRadius: isFirstItem ? 4 : 0,
          borderBottomLeftRadius: isFirstItem ? 4 : 0,
          borderTopRightRadius: isLastItem ? 4 : 0,
          borderBottomRightRadius: isLastItem ? 4 : 0,
        };
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.button, buttonStyle]}
            onPress={() => handleTogglePress(item)}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    selectedToggle.id === item.id ? Colors.white : Colors.black,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(KeyHostToggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: hp(1),
  },
  text: { fontSize: 10, fontWeight: "500" },
  button: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
