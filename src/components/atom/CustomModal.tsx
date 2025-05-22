import Colors from '@assets/colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@assets/sizes/Sizes';
import React from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
type Props = {
  children?: React.ReactNode;
  visible?: boolean;
  closeModal?: () => void;
  disable?: boolean;
  closing?: boolean;
  containerStyle?: ViewStyle;
};

const CustomModal = React.memo(
  ({
    children,
    closeModal,
    closing,
    containerStyle,
    disable,
    visible,
  }: Props) => {
    const toggleModal = () => {
      closeModal && closeModal();
    };
    const pan = React.useRef(new Animated.ValueXY()).current;
    const panResponder = React.useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
          if (gestureState.dy > 50) {
            closeModal && closeModal();
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;
    return (
      <Modal
        scrollHorizontal
        isVisible={visible}
        style={styles.modal}
        onBackdropPress={toggleModal}
        onSwipeComplete={closeModal}
        swipeDirection='down'
      >
        <KeyboardAvoidingView behavior='padding'>
          <View
            style={[
              {
                backgroundColor: Colors.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 20,
                paddingBottom: hp(2),
              },
              containerStyle,
            ]}
            {...(disable ? {} : panResponder.panHandlers)}
          >
            <SafeAreaView>
              <TouchableOpacity style={styles.slider}></TouchableOpacity>
              {children}
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
);
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,
  },
  slider: {
    backgroundColor: Colors.black,
    borderRadius: hp(2),
    height: hp(0.6),
    width: wp(18),
    alignSelf: 'center',
    marginTop: hp(2),
  },
});

export default CustomModal;
