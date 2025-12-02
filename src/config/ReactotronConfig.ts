import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
    interface Console {
        tron: typeof Reactotron;
    }
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: 'Bank Saving System',
        host: '10.0.2.2', // Android emulator host address (use your computer's IP for real device)
    })
    .useReactNative({
        asyncStorage: true,
        networking: {
            ignoreUrls: /symbolicate/,
        },
        editor: false,
        errors: { veto: (stackFrame) => false },
        overlay: false,
    })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

// Make Reactotron available globally for debugging
if (__DEV__) {
    console.tron = reactotron;
}

export default reactotron;
