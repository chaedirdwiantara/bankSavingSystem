import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { accountActions } from '../../store/slices/accountSlice';
import { customerActions } from '../../store/slices/customerSlice';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Card, Button, Loading, EmptyState } from '../../components';
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

    const getCustomerName = (id: string) => {
        return customers.find(c => c.id === id)?.name || 'Unknown Customer';
    };

    const getDepositoName = (id: string) => {
        return depositoTypes.find(d => d.id === id)?.name || 'Unknown Type';
    };

    if (loading) {
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

            {accounts.length === 0 ? (
                <EmptyState
                    title="No Accounts Yet"
                    description="Create your first savings account"
                    icon="💼"
                    action={
                        <Button title="Open Account" onPress={handleAdd} variant="primary" />
                    }
                />
            ) : (
                <FlatList
                    data={accounts}
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
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
    },
    addButton: {
        minWidth: 80,
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
