import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import Reactotron from '../config/ReactotronConfig';

import customerReducer from './slices/customerSlice';
import accountReducer from './slices/accountSlice';
import depositoReducer from './slices/depositoSlice';
import transactionReducer from './slices/transactionSlice';

const sagaMonitor = __DEV__ ? Reactotron.createSagaMonitor?.() : undefined;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        account: accountReducer,
        deposito: depositoReducer,
        transaction: transactionReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: false, // Disable thunk since we're using saga
            serializableCheck: {
                // Ignore these action types for Date serialization
                ignoredActions: [
                    'customer/createCustomerRequest',
                    'customer/updateCustomerRequest',
                    'account/createAccountRequest',
                    'deposito/createDepositoTypeRequest',
                    'deposito/updateDepositoTypeRequest',
                    'transaction/createDepositRequest',
                    'transaction/createWithdrawalRequest',
                ],
                // Ignore these paths in the state for Date objects
                ignoredPaths: ['customer.customers', 'account.accounts', 'deposito.depositoTypes', 'transaction.transactions'],
            },
        }).concat(sagaMiddleware),
    enhancers: (getDefaultEnhancers) =>
        __DEV__
            ? getDefaultEnhancers().concat(Reactotron.createEnhancer())
            : getDefaultEnhancers(),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
