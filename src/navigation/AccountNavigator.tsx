import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList } from './types';
import AccountListScreen from '../screens/Account/AccountListScreen';
import AccountFormScreen from '../screens/Account/AccountFormScreen';
import AccountDetailScreen from '../screens/Account/AccountDetailScreen';
import TransactionHistoryScreen from '../screens/Transaction/TransactionHistoryScreen';
import DepositFormScreen from '../screens/Transaction/DepositFormScreen';
import WithdrawalFormScreen from '../screens/Transaction/WithdrawalFormScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="AccountList" component={AccountListScreen} />
            <Stack.Screen name="AccountForm" component={AccountFormScreen} />
            <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="DepositForm" component={DepositFormScreen} />
            <Stack.Screen name="WithdrawalForm" component={WithdrawalFormScreen} />
        </Stack.Navigator>
    );
};


