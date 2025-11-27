import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { accountActions } from '../../store/slices/accountSlice';
import { customerActions } from '../../store/slices/customerSlice';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Card, Button, Loading, Modal } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountDetail'>;

const AccountDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { accountId } = route.params;
    const dispatch = useAppDispatch();

    const { accounts, loading } = useAppSelector(state => state.account);
    const { customers } = useAppSelector(state => state.customer);
    const { depositoTypes } = useAppSelector(state => state.deposito);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const account = accounts.find(a => a.id === accountId);
    const customer = account ? customers.find(c => c.id === account.customerId) : null;
    const depositoType = account ? depositoTypes.find(d => d.id === account.depositoTypeId) : null;

    useEffect(() => {
        if (!customers.length) dispatch(customerActions.fetchCustomersRequest());
        if (!depositoTypes.length) dispatch(depositoActions.fetchDepositoTypesRequest());
    }, [dispatch, customers.length, depositoTypes.length]);

    if (!account || !customer || !depositoType) {
        return (
            <Screen>
                <Loading fullScreen />
            </Screen>
        );
    }

    const handleDelete = () => {
        if (account.balance > 0) {
            Alert.alert(
                'Cannot Delete',
                'Account has remaining balance. Please withdraw all funds first.',
            );
            return;
        }
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(accountActions.deleteAccountRequest(accountId));
        setShowDeleteModal(false);
        navigation.goBack();
    };

    const handleDeposit = () => {
        navigation.navigate('DepositForm', { accountId });
    };

    const handleWithdraw = () => {
        navigation.navigate('WithdrawalForm', { accountId });
    };

    return (
        <Screen scrollable>
            <View style={styles.header}>
                <Button
                    title="← Back"
                    onPress={() => navigation.goBack()}
                    variant="ghost"
                    size="sm"
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    variant="danger"
                    size="sm"
                />
            </View>

            <Card variant="elevated" style={styles.mainCard}>
                <Text style={styles.label}>Account Balance</Text>
                <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Customer</Text>
                    <Text style={styles.rowValue}>{customer.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Type</Text>
                    <Text style={styles.rowValue}>{depositoType.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Interest Rate</Text>
                    <Text style={styles.rowValue}>
                        {formatPercentage(depositoType.yearlyReturn)} / year
                    </Text>
                </View>
            </Card>

            <View style={styles.actions}>
                <Button
                    title="Deposit"
                    onPress={handleDeposit}
                    variant="primary"
                    style={styles.actionBtn}
                />
                <Button
                    title="Withdraw"
                    onPress={handleWithdraw}
                    variant="outline"
                    style={styles.actionBtn}
                />
            </View>

            <Text style={styles.sectionTitle}>Transaction History</Text>
            <Card variant="outlined">
                <Text style={styles.emptyText}>No transactions yet</Text>
                {/* Transaction list will be implemented in Phase 13 */}
            </Card>

            <Modal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Close Account?"
                primaryButton={{
                    title: 'Close Account',
                    onPress: confirmDelete,
                }}
                secondaryButton={{
                    title: 'Cancel',
                    onPress: () => setShowDeleteModal(false),
                }}>
                <Text style={styles.modalText}>
                    Are you sure you want to close this account? This action cannot be undone.
                </Text>
            </Modal>
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
    mainCard: {
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    balance: {
        fontSize: FontSizes['3xl'],
        fontWeight: FontWeights.bold,
        color: Colors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xs,
    },
    rowLabel: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
    },
    rowValue: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.medium,
        color: Colors.textPrimary,
    },
    actions: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    actionBtn: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        padding: Spacing.md,
    },
    modalText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
});

export default AccountDetailScreen;
