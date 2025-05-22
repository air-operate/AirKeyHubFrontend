import {Platform} from 'react-native';
export const isIOS = Platform.OS === 'ios';
export const authCredentials = {
  google: {
    googleIosClientId: '',
    googleAndroidClientId: '',
  },
  facebook: {
    appId: '',
    secret: '',
  },
};
