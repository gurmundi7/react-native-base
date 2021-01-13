import { Dimensions, Platform } from 'react-native';
export const { width, height } = Dimensions.get('window');

//-- DEVICE SPECIFIC
export const platformName = Platform.OS;

export const isIOS = platformName === 'ios';
export const isAndroid = platformName === 'android';

export const nonIOS = !isIOS;

//-- iPHONE RELATED
const isIPhoneXSize = isIOS && (height == 812 || width == 812);
const isIPhoneXrSize = isIOS && (height == 896 || width == 896);
const isIPhoneXMaxSize = isIOS && (height == 896 || width == 896);

export const isIphoneX = isIPhoneXSize || isIPhoneXrSize || isIPhoneXMaxSize;
