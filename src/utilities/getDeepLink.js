import {Platform} from 'react-native';
export default (path = '') => {
  const scheme = 'https';
  const prefix =
    Platform.OS === 'android'
      ? `${scheme}://videnar-dev.auth.ap-south-1.amazoncognito.com/`
      : `${scheme}://`;
  return prefix + path;
};
