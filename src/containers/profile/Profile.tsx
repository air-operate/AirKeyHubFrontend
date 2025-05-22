import { useNavigation } from '@react-navigation/native';
import RouteNames from '@routeNames';
import { translate } from '@translations/translate';
import React from 'react';
import { Alert, Platform, SafeAreaView, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirKeyButton } from 'src/components/atom/airKeyButton';
import ProfileCapture from 'src/components/buttons/profilecapture';
import AddKeyInput from 'src/components/inputs/addKeyInput';
import ProfileModal from 'src/components/modal/profilemodal';
import { styles } from './Styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getOwnerProfile } from 'src/redux/actions/getOwnerProfile';
import { Loader } from 'src/components/loader/loader';
import { updateProfileAPI } from 'src/redux/actions/updateProfile';
import { IUpdateProfile } from '@interfaces/IUpdateProfile';
import AirKeyHeader from 'src/components/atom/AirKeyHeader';
import { validateProfileForm } from './validations';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [edit, setEdit] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    profileImage: '',
  });
  const [formError, setFormError] = React.useState({
    name: '',
    profileImage: '',
  });
  const [isVisible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const { loading, response: profileDetail } = useAppSelector(
    (state) => state.getOnwerProfile
  );
  const { loading: updateLoading, response: profileUpdated } = useAppSelector(
    (state) => state.updateProfile
  );

  React.useEffect(() => {
    dispatch(getOwnerProfile());
  }, [profileUpdated]);

  React.useEffect(() => {
    if (profileDetail) {
      setForm({
        ...form,
        name: profileDetail.data.userName,
      });
    }
  }, [profileDetail]);

  const handleCameraPress = () => {
    if (edit) {
      setVisible(true);
    }
  };
  const handleCancelPress = () => {
    setVisible(!isVisible);
  };

  const selectImageFromCamera = async () => {
    try {
      // Attempt to open the camera directly
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: false,
        mediaType: 'photo',
      });

      setForm({ ...form, profileImage: image.path });
      setSelectedImage(image.path || '');
      setVisible(false);
    } catch (error) {
      console.error('Error opening camera:', error);

      // Handle cancellation gracefully
      if (error?.code === 'E_PICKER_CANCELLED') {
        console.log('User cancelled the camera.');
        return;
      }

      // Fallback to check permissions if error persists
      const cameraPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await check(cameraPermission);
      console.log('Camera Permission Status:', result);

      if (result === RESULTS.DENIED) {
        const requestResult = await request(cameraPermission);
        if (requestResult !== RESULTS.GRANTED) {
          return Alert.alert('Camera permission is required to take photos.');
        } else {
          return selectImageFromCamera(); // Retry after granting permission
        }
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Camera permission is blocked. Please enable it from settings.',
          [
            { text: 'Cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ]
        );
      } else if (result === RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Feature Unavailable',
          'Camera access is not available on this device.'
        );
      }
    }
  };

  const selectImageFromGallery = async () => {
    try {
      // Attempt to open the gallery directly
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: false,
        mediaType: 'photo',
      });

      setSelectedImage(image.path || '');
      setForm({ ...form, profileImage: image.path });
      setVisible(false);
    } catch (error) {
      console.error('Error opening gallery:', error);

      // Check if the error is due to permission denial
      if (error?.code === 'E_PICKER_CANCELLED') {
        console.log('User cancelled the picker.');
        return;
      }

      // Fallback to check permissions
      const galleryPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

      const result = await check(galleryPermission);
      console.log('Gallery Permission Status:', result);

      if (result === RESULTS.DENIED) {
        const requestResult = await request(galleryPermission);
        if (requestResult !== RESULTS.GRANTED) {
          return Alert.alert(
            'Gallery permission is required to select photos.'
          );
        } else {
          return selectImageFromGallery(); // Retry after granting permission
        }
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Gallery permission is blocked. Please enable it from settings.',
          [
            { text: 'Cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ]
        );
      } else if (result === RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Feature Unavailable',
          'Gallery access is not available on this device.'
        );
      }
    }
  };

  function save() {
    const newFormError = validateProfileForm(form);
    setFormError(newFormError);
    const isFormValid = Object.values(newFormError).every((error) => !error);
    if (isFormValid) {
      const params: IUpdateProfile = {
        name: form.name,
        profileImage: form.profileImage,
      };
      dispatch(updateProfileAPI(params));
      setEdit(!edit);
    }
  }

  if (loading || updateLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.header}>
            <AirKeyHeader
              text={translate('profile')}
              onPressBack={navigation.goBack}
              rightLabel={edit ? translate('save') : translate('edit')}
              onPressRight={() => (edit ? save() : setEdit(!edit))}
              textStyle={{ marginRight: 0 }}
            />
            <ProfileCapture
              text={profileDetail?.data.userName ?? ''}
              onPress={handleCameraPress}
              imageSource={
                selectedImage === null
                  ? profileDetail?.data.image
                    ? { uri: `${profileDetail?.data.profileImage}` }
                    : undefined
                  : { uri: selectedImage }
              }
              disabled={!edit}
            />
            <View style={styles.centerSection}>
              <AddKeyInput
                text={translate('fullName')}
                textInputStyle={styles.input}
                placeHolder={''}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.toString() })}
                editable={edit}
                error={formError.name}
              />
              <AddKeyInput
                text={translate('emailAdd')}
                textInputStyle={styles.input}
                placeHolder={
                  profileDetail?.data.email ? profileDetail?.data.email : ''
                }
                keyboardType='email-address'
                editable={false}
              />
            </View>
            <AirKeyButton
              text={translate('changePassword')}
              buttonStyle={styles.changePasswordButton}
              onPress={() =>
                navigation.navigate(RouteNames.changePasswordPage.name)
              }
              titleStyle={styles.buttonTextStyle}
            />
          </View>
        </KeyboardAwareScrollView>
        <ProfileModal
          isVisible={isVisible}
          onClose={handleCancelPress}
          onPressCamera={selectImageFromCamera}
          onPressGallery={selectImageFromGallery}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
