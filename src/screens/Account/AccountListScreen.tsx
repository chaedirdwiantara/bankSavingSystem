import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { accountActions } from '../../store/slices/accountSlice';
import { customerActions } from '../../store/slices/customerSlice';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Card, Button, Loading, EmptyState, Input } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatCurrency } from '../../utils/formatters';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountList'>;

const AccountListScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { accounts, loading } = useAppSelector(state => state.account);
    const { customers } = useAppSelector(state => state.customer);
    const { depositoTypes } = useAppSelector(state => state.deposito);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(accountActions.fetchAccountsRequest());
        dispatch(customerActions.fetchCustomersRequest());
        dispatch(depositoActions.fetchDepositoTypesRequest());
    }, [dispatch]);

    const handleAdd = () => {
        navigation.navigate('AccountForm', { mode: 'create' });
    };

    const handlePress = (id: string) => {
        navigation.navigate('AccountDetail', { accountId: id });
    };

    const handleRefresh = () => {
        dispatch(accountActions.fetchAccountsRequest());
        dispatch(customerActions.fetchCustomersRequest());
        dispatch(depositoActions.fetchDepositoTypesRequest());
    };

    const getCustomerName = (id: string) => {
        return customers.find(c => c.id === id)?.name || 'Unknown Customer';
    };

    const getDepositoName = (id: string) => {
        return depositoTypes.find(d => d.id === id)?.name || 'Unknown Type';
    };

    // Filter accounts based on customer name search
    const filteredAccounts = accounts.filter(account => {
        const customerName = getCustomerName(account.customerId);
        return customerName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading && accounts.length === 0) {
        return (
            <Screen>
                <Loading fullScreen />
            </Screen>
        );
    }

    return (
        <Screen>
            <View style={styles.header}>
                <Text style={styles.title}>💼 Accounts</Text>
                <Button
                    title="+ Add"
                    onPress={handleAdd}
                    size="sm"
                    style={styles.addButton}
                />
            </View>

            {/* Search Bar */}
            <Input
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by customer name..."
                style={styles.searchInput}
            />

            {filteredAccounts.length === 0 ? (
                <EmptyState
                    title={searchQuery ? 'No Results Found' : 'No Accounts Yet'}
                    description={
                        searchQuery
                            ? `No accounts match "${searchQuery}"`
                            : 'Create your first savings account'
                    }
                    icon={searchQuery ? '🔍' : '💼'}
                    action={
                        !searchQuery ? (
                            <Button title="Open Account" onPress={handleAdd} variant="primary" />
                        ) : undefined
                    }
                />
            ) : (
                <FlatList
                    data={filteredAccounts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => handlePress(item.id)} variant="outlined">
                            <View style={styles.cardContent}>
                                <View style={styles.info}>
                                    <Text style={styles.customerName}>
                                        {getCustomerName(item.customerId)}
                                    </Text>
                                    <Text style={styles.depositoType}>
                                        {getDepositoName(item.depositoTypeId)}
                                    </Text>
                                    <Text style={styles.balance}>
                                        {formatCurrency(item.balance)}
                                    </Text>
                                </View>
                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </Card>
                    )}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={handleRefresh}
                            colors={[Colors.primary]}
                            tintColor={Colors.primary}
                        />
                    }
                />
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
    },
    addButton: {
        minWidth: 80,
    },
    searchInput: {
        marginBottom: Spacing.md,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
    },
    customerName: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    depositoType: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    balance: {
        fontSize: FontSizes.base,
        color: Colors.primary,
        fontWeight: FontWeights.bold,
    },
    arrow: {
        fontSize: 24,
        color: Colors.textSecondary,
    },
});

export default AccountListScreen;
