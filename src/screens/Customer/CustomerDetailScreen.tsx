import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@navigation/types';
import { Screen, Card, Button, Loading, Modal } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { customerActions } from '@store/slices/customerSlice';
import { accountActions } from '@store/slices/accountSlice';
import { Colors } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { FontSizes, FontWeights } from '@constants/typography';
import { formatDate } from '@utils/formatters';

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerDetail'>;

const CustomerDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { customerId } = route.params;
    const dispatch = useAppDispatch();
    const { customers } = useAppSelector(state => state.customer);
    const { accounts } = useAppSelector(state => state.account);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const customer = customers.find(c => c.id === customerId);
    const customerAccounts = accounts.filter(a => a.customerId === customerId);

    useEffect(() => {
        dispatch(accountActions.fetchAccountsRequest());
    }, [dispatch]);

    if (!customer) {
        return (
            <Screen>
                <Text style={styles.error}>Customer not found</Text>
            </Screen>
        );
    }

    const handleEdit = () => {
        navigation.navigate('CustomerForm', { customerId, mode: 'edit' });
    };

    const handleDelete = () => {
        if (customerAccounts.length > 0) {
            Alert.alert(
                'Cannot Delete',
                'Customer has active accounts. Please delete all accounts first.',
            );
            return;
        }
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(customerActions.deleteCustomerRequest(customerId));
        setShowDeleteModal(false);
        navigation.goBack();
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
                <View style={styles.headerActions}>
                    <Button
                        title="Edit"
                        onPress={handleEdit}
                        variant="outline"
                        size="sm"
                        style={styles.actionButton}
                    />
                    <Button
                        title="Delete"
                        onPress={handleDelete}
                        variant="danger"
                        size="sm"
                    />
                </View>
            </View>

            <Card variant="elevated">
                <Text style={styles.icon}>👤</Text>
                <Text style={styles.name}>{customer.name}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Created:</Text>
                    <Text style={styles.value}>{formatDate(customer.createdAt)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Last Updated:</Text>
                    <Text style={styles.value}>{formatDate(customer.updatedAt)}</Text>
                </View>
            </Card>

            <Card variant="outlined">
                <Text style={styles.sectionTitle}>
                    💼 Accounts ({customerAccounts.length})
                </Text>
                {customerAccounts.length === 0 ? (
                    <Text style={styles.noData}>No accounts yet</Text>
                ) : (
                    customerAccounts.map(account => (
                        <View key={account.id} style={styles.accountItem}>
                            <Text style={styles.accountText}>Account ID: {account.id.substring(0, 8)}...</Text>
                            <Text style={styles.accountBalance}>
                                Balance: Rp {account.balance.toLocaleString('id-ID')}
                            </Text>
                        </View>
                    ))
                )}
            </Card>

            <Modal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Customer?"
                primaryButton={{
                    title: 'Delete',
                    onPress: confirmDelete,
                }}
                secondaryButton={{
                    title: 'Cancel',
                    onPress: () => setShowDeleteModal(false),
                }}>
                <Text style={styles.modalText}>
                    Are you sure you want to delete {customer.name}? This action cannot be
                    undone.
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
    headerActions: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    actionButton: {
        marginRight: Spacing.xs,
    },
    icon: {
        fontSize: 64,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    name: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    label: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
    },
    value: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.medium,
        color: Colors.textPrimary,
    },
    sectionTitle: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    noData: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingVertical: Spacing.lg,
    },
    accountItem: {
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    accountText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
    },
    accountBalance: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    error: {
        fontSize: FontSizes.lg,
        color: Colors.error,
        textAlign: 'center',
    },
    modalText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
});

export default CustomerDetailScreen;
