import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepositoStackParamList } from './types';
import DepositoTypeListScreen from '../screens/DepositoType/DepositoTypeListScreen';
import DepositoTypeFormScreen from '../screens/DepositoType/DepositoTypeFormScreen';

const Stack = createNativeStackNavigator<DepositoStackParamList>();

export const DepositoNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="DepositoTypeList"
                component={DepositoTypeListScreen}
            />
            <Stack.Screen
                name="DepositoTypeForm"
                component={DepositoTypeFormScreen}
            />
        </Stack.Navigator>
    );
};
