import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { accountActions } from '../../store/slices/accountSlice';
import { customerActions } from '../../store/slices/customerSlice';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Input, Button, Modal } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatPercentage } from '../../utils/formatters';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountForm'>;

const AccountFormScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mode } = route.params;
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector(state => state.account);
    const { customers } = useAppSelector(state => state.customer);
    const { depositoTypes } = useAppSelector(state => state.deposito);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [selectedDepositoTypeId, setSelectedDepositoTypeId] = useState('');
    const [initialBalance, setInitialBalance] = useState('');

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDepositoModal, setShowDepositoModal] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        dispatch(customerActions.fetchCustomersRequest());
        dispatch(depositoActions.fetchDepositoTypesRequest());
    }, [dispatch]);

    const getCustomerName = () => {
        return customers.find(c => c.id === selectedCustomerId)?.name || 'Select Customer';
    };

    const getDepositoName = () => {
        const type = depositoTypes.find(d => d.id === selectedDepositoTypeId);
        return type ? `${type.name} (${formatPercentage(type.yearlyReturn)})` : 'Select Deposito Type';
    };

    const validate = (): boolean => {
        if (!selectedCustomerId) {
            setFormError('Please select a customer');
            return false;
        }
        if (!selectedDepositoTypeId) {
            setFormError('Please select a deposito type');
            return false;
        }

        // Check initial balance if provided
        if (initialBalance) {
            const balance = parseFloat(initialBalance);
            if (isNaN(balance) || balance < 0) {
                setFormError('Invalid initial balance');
                return false;
            }
        }

        setFormError('');
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;

        dispatch(
            accountActions.createAccountRequest({
                customerId: selectedCustomerId,
                depositoTypeId: selectedDepositoTypeId,
                initialBalance: initialBalance ? parseFloat(initialBalance) : 0,
            }),
        );

        // Navigate back on success
        setTimeout(() => {
            if (!error) {
                navigation.goBack();
            }
        }, 300);
    };

    return (
        <Screen scrollable>
            <Text style={styles.title}>💼 Open New Account</Text>

            {/* Customer Selection */}
            <Text style={styles.label}>Customer</Text>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowCustomerModal(true)}>
                <Text style={selectedCustomerId ? styles.selectorText : styles.placeholderText}>
                    {getCustomerName()}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {/* Deposito Type Selection */}
            <Text style={styles.label}>Deposito Type</Text>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowDepositoModal(true)}>
                <Text style={selectedDepositoTypeId ? styles.selectorText : styles.placeholderText}>
                    {getDepositoName()}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {/* Initial Balance */}
            <Input
                label="Initial Balance (Optional)"
                value={initialBalance}
                onChangeText={setInitialBalance}
                placeholder="e.g. 1000000"
                keyboardType="numeric"
                prefix="Rp"
            />

            {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
                title="Create Account"
                onPress={handleSave}
                loading={loading}
                fullWidth
                style={styles.saveButton}
            />

            <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="ghost"
                fullWidth
            />

            {/* Customer Selection Modal */}
            <Modal
                visible={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
                title="Select Customer">
                <ScrollView style={styles.modalList}>
                    {customers.map(customer => (
                        <TouchableOpacity
                            key={customer.id}
                            style={styles.modalItem}
                            onPress={() => {
                                setSelectedCustomerId(customer.id);
                                setShowCustomerModal(false);
                                setFormError('');
                            }}>
                            <Text style={styles.modalItemText}>{customer.name}</Text>
                            {selectedCustomerId === customer.id && (
                                <Text style={styles.checkMark}>✓</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Modal>

            {/* Deposito Type Selection Modal */}
            <Modal
                visible={showDepositoModal}
                onClose={() => setShowDepositoModal(false)}
                title="Select Deposito Type">
                <ScrollView style={styles.modalList}>
                    {depositoTypes.map(type => (
                        <TouchableOpacity
                            key={type.id}
                            style={styles.modalItem}
                            onPress={() => {
                                setSelectedDepositoTypeId(type.id);
                                setShowDepositoModal(false);
                                setFormError('');
                            }}>
                            <View>
                                <Text style={styles.modalItemText}>{type.name}</Text>
                                <Text style={styles.modalItemSubtext}>
                                    {formatPercentage(type.yearlyReturn)} interest
                                </Text>
                            </View>
                            {selectedDepositoTypeId === type.id && (
                                <Text style={styles.checkMark}>✓</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Modal>
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
    label: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        backgroundColor: Colors.background,
    },
    selectorText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
    },
    placeholderText: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
    },
    arrow: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    saveButton: {
        marginTop: Spacing.md,
        marginBottom: Spacing.sm,
    },
    errorText: {
        color: Colors.error,
        marginBottom: Spacing.sm,
        fontSize: FontSizes.sm,
    },
    modalList: {
        maxHeight: 300,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    modalItemText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
        fontWeight: FontWeights.medium,
    },
    modalItemSubtext: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    checkMark: {
        color: Colors.primary,
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
    },
});

export default AccountFormScreen;
