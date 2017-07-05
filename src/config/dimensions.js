import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export default {
    header: {
        height: isIOS ? 60 : 48,
        paddingTop: isIOS ? 18 : 10,
    }
};
