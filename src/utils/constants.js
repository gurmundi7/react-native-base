import { Dimensions, Platform } from 'react-native';
export const { width, height } = Dimensions.get('window');

export const platformName = Platform.OS;

export const isIOS = platformName === 'ios';
export const nonIOS = !isIOS;

const isIPhoneXSize = isIOS && (height == 812 || width == 812);
const isIPhoneXrSize = isIOS && (height == 896 || width == 896);
const isIPhoneXMaxSize = isIOS && (height == 896 || width == 896);

export const isIphoneX = isIPhoneXSize || isIPhoneXrSize || isIPhoneXMaxSize; // 812*896 || 896*812

export const rupeeSymbol = '₹';
export const defaultCurrency = rupeeSymbol;

export const prefixCurrency = (amount) => defaultCurrency + amount;

export const Font_Roboto = 'Roboto';
export const Font_Source_Code_Pro = 'Source Code Pro';
