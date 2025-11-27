import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { transactionActions } from '../../store/slices/transactionSlice';
import { Screen, Card, Loading, EmptyState } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatCurrency, formatDate } from '../../utils/formatters';

type Props = NativeStackScreenProps<AccountStackParamList, 'TransactionHistory'>;

const TransactionHistoryScreen: React.FC<Props> = ({ route }) => {
    const { accountId } = route.params;
    const dispatch = useAppDispatch();
    const { transactions, loading } = useAppSelector(state => state.transaction);

    useEffect(() => {
        dispatch(transactionActions.fetchTransactionsRequest(accountId));
    }, [dispatch, accountId]);

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'DEPOSIT':
                return Colors.success;
            case 'WITHDRAWAL':
                return Colors.error;
            case 'INTEREST':
                return Colors.primary;
            default:
                return Colors.textPrimary;
        }
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'DEPOSIT':
                return '⬇️';
            case 'WITHDRAWAL':
                return '⬆️';
            case 'INTEREST':
                return '💰';
            default:
                return '📄';
        }
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
            <Text style={styles.title}>📜 Transaction History</Text>

            {transactions.length === 0 ? (
                <EmptyState
                    title="No Transactions"
                    description="This account has no transaction history yet"
                    icon="📄"
                />
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card variant="outlined" style={styles.card}>
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.icon}>
                                        {getTransactionIcon(item.type)}
                                    </Text>
                                    <View>
                                        <Text style={styles.type}>{item.type}</Text>
                                        <Text style={styles.date}>
                                            {formatDate(item.date)}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        styles.amount,
                                        { color: getTransactionColor(item.type) },
                                    ]}>
                                    {item.type === 'WITHDRAWAL' ? '-' : '+'}
                                    {formatCurrency(item.amount)}
                                </Text>
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
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    card: {
        marginBottom: Spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    icon: {
        fontSize: 24,
    },
    type: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.semibold,
        color: Colors.textPrimary,
    },
    date: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
    },
    amount: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.bold,
    },
});

export default TransactionHistoryScreen;
