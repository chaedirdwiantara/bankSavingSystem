import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@navigation/types';
import { Screen, Input, Button } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { customerActions } from '@store/slices/customerSlice';
import { Colors } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { FontSizes, FontWeights } from '@constants/typography';

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerForm'>;

const CustomerFormScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mode, customerId } = route.params;
    const dispatch = useAppDispatch();
    const { loading, error, customers } = useAppSelector(state => state.customer);

    const existingCustomer = customerId
        ? customers.find(c => c.id === customerId)
        : null;

    const [name, setName] = useState(existingCustomer?.name || '');
    const [nameError, setNameError] = useState('');

    const validate = (): boolean => {
        if (!name.trim()) {
            setNameError('Customer name is required');
            return false;
        }
        if (name.trim().length < 3) {
            setNameError('Name must be at least 3 characters');
            return false;
        }
        setNameError('');
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;

        if (mode === 'create') {
            dispatch(customerActions.createCustomerRequest({ name: name.trim() }));
        } else if (customerId) {
            dispatch(
                customerActions.updateCustomerRequest({
                    id: customerId,
                    name: name.trim(),
                }),
            );
        }

        // Navigate back on success
        setTimeout(() => {
            if (!error) {
                navigation.goBack();
            }
        }, 300);
    };

    return (
        <Screen scrollable keyboardAvoiding>
            <Text style={styles.title}>
                {mode === 'create' ? '👤 Add Customer' : '✏️ Edit Customer'}
            </Text>

            <Input
                label="Customer Name"
                value={name}
                onChangeText={text => {
                    setName(text);
                    setNameError('');
                }}
                placeholder="Enter customer name"
                error={nameError || error || undefined}
                required
                autoFocus
            />

            <Button
                title={mode === 'create' ? 'Create Customer' : 'Update Customer'}
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
    saveButton: {
        marginTop: Spacing.lg,
        marginBottom: Spacing.sm,
    },
});

export default CustomerFormScreen;
