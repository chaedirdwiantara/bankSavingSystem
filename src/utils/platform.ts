import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const platformSelect = <T,>(config: { ios: T; android: T }): T => {
    return Platform.select(config) as T;
};
