import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { CustomerNavigator } from './CustomerNavigator';
import { AccountNavigator } from './AccountNavigator';
import { DepositoNavigator } from './DepositoNavigator';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
            }}>
            <Tab.Screen
                name="CustomersTab"
                component={CustomerNavigator}
                options={{
                    tabBarLabel: 'Customers',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={[styles.icon, { color }]}>👥</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="AccountsTab"
                component={AccountNavigator}
                options={{
                    tabBarLabel: 'Accounts',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={[styles.icon, { color }]}>💼</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="DepositoTypesTab"
                component={DepositoNavigator}
                options={{
                    tabBarLabel: 'Deposito',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={[styles.icon, { color }]}>💰</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        paddingBottom: 12,
        paddingTop: 8,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    icon: {
        fontSize: 24,
    },
});
