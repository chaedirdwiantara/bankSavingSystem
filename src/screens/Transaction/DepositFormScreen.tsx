import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { transactionActions } from '../../store/slices/transactionSlice';
import { accountActions } from '../../store/slices/accountSlice';
import { Screen, Input, Button, Card } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatCurrency } from '../../utils/formatters';

type Props = NativeStackScreenProps<AccountStackParamList, 'DepositForm'>;

const DepositFormScreen: React.FC<Props> = ({ navigation, route }) => {
    const { accountId } = route.params;
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector(state => state.transaction);
    const { accounts } = useAppSelector(state => state.account);

    const account = accounts.find(a => a.id === accountId);
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');

    useEffect(() => {
        if (!accounts.length) dispatch(accountActions.fetchAccountsRequest());
    }, [dispatch, accounts.length]);

    if (!account) return null;

    const validate = (): boolean => {
        const val = parseFloat(amount);
        if (!amount) {
            setAmountError('Amount is required');
            return false;
        }
        if (isNaN(val) || val <= 0) {
            setAmountError('Amount must be greater than 0');
            return false;
        }
        setAmountError('');
        return true;
    };

    const handleDeposit = () => {
        if (!validate()) return;

        dispatch(
            transactionActions.createDepositRequest({
                accountId,
                amount: parseFloat(amount),
                depositDate: new Date(),
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
        <Screen scrollable keyboardAvoiding>
            <Text style={styles.title}>💰 Deposit Funds</Text>

            <Card variant="outlined" style={styles.infoCard}>
                <Text style={styles.label}>Current Balance</Text>
                <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>
            </Card>

            <Input
                label="Deposit Amount"
                value={amount}
                onChangeText={text => {
                    setAmount(text);
                    setAmountError('');
                }}
                placeholder="e.g. 500000"
                keyboardType="numeric"
                prefix="Rp"
                error={amountError || error || undefined}
                required
                autoFocus
            />

            <Button
                title="Confirm Deposit"
                onPress={handleDeposit}
                loading={loading}
                fullWidth
                style={styles.submitButton}
            />

            <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="ghost"
                fullWidth
            />
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
    infoCard: {
        marginBottom: Spacing.lg,
        alignItems: 'center',
    },
    label: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    balance: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.primary,
    },
    submitButton: {
        marginTop: Spacing.lg,
        marginBottom: Spacing.sm,
    },
});

export default DepositFormScreen;
