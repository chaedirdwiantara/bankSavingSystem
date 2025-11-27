import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DepositoStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Input, Button, Modal } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';

type Props = NativeStackScreenProps<DepositoStackParamList, 'DepositoTypeForm'>;

const DepositoTypeFormScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mode, depositoTypeId } = route.params;
    const dispatch = useAppDispatch();
    const { depositoTypes, loading, error } = useAppSelector(
        state => state.deposito,
    );

    const existingType = depositoTypeId
        ? depositoTypes.find(d => d.id === depositoTypeId)
        : null;

    const [name, setName] = useState(existingType?.name || '');
    const [rate, setRate] = useState(
        existingType ? (existingType.yearlyReturn * 100).toString() : '',
    );

    const [nameError, setNameError] = useState('');
    const [rateError, setRateError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const validate = (): boolean => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        } else if (name.trim().length < 3) {
            setNameError('Name must be at least 3 characters');
            isValid = false;
        } else {
            setNameError('');
        }

        const rateNum = parseFloat(rate);
        if (!rate) {
            setRateError('Interest rate is required');
            isValid = false;
        } else if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
            setRateError('Rate must be between 0 and 100');
            isValid = false;
        } else {
            setRateError('');
        }

        return isValid;
    };

    const handleSave = () => {
        if (!validate()) return;

        const rateNum = parseFloat(rate) / 100; // Convert to decimal

        if (mode === 'create') {
            dispatch(
                depositoActions.createDepositoTypeRequest({
                    name: name.trim(),
                    yearlyReturn: rateNum,
                }),
            );
        } else if (depositoTypeId) {
            dispatch(
                depositoActions.updateDepositoTypeRequest({
                    id: depositoTypeId,
                    name: name.trim(),
                    yearlyReturn: rateNum,
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

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (depositoTypeId) {
            dispatch(depositoActions.deleteDepositoTypeRequest(depositoTypeId));
            setShowDeleteModal(false);
            navigation.goBack();
        }
    };

    return (
        <Screen scrollable keyboardAvoiding>
            <Text style={styles.title}>
                {mode === 'create' ? '💰 Add Deposito Type' : '✏️ Edit Deposito Type'}
            </Text>

            <Input
                label="Type Name"
                value={name}
                onChangeText={text => {
                    setName(text);
                    setNameError('');
                }}
                placeholder="e.g. Gold Deposito"
                error={nameError || error || undefined}
                required
            />

            <Input
                label="Yearly Interest Rate (%)"
                value={rate}
                onChangeText={text => {
                    setRate(text);
                    setRateError('');
                }}
                placeholder="e.g. 5.5"
                keyboardType="numeric"
                error={rateError}
                required
                suffix="%"
            />

            <View style={styles.actions}>
                <Button
                    title={mode === 'create' ? 'Create Type' : 'Update Type'}
                    onPress={handleSave}
                    loading={loading}
                    fullWidth
                    style={styles.saveButton}
                />

                {mode === 'edit' && (
                    <Button
                        title="Delete Type"
                        onPress={handleDelete}
                        variant="danger"
                        fullWidth
                        style={styles.deleteButton}
                    />
                )}

                <Button
                    title="Cancel"
                    onPress={() => navigation.goBack()}
                    variant="ghost"
                    fullWidth
                />
            </View>

            <Modal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Deposito Type?"
                primaryButton={{
                    title: 'Delete',
                    onPress: confirmDelete,
                }}
                secondaryButton={{
                    title: 'Cancel',
                    onPress: () => setShowDeleteModal(false),
                }}>
                <Text style={styles.modalText}>
                    Are you sure you want to delete {name}? This action cannot be undone.
                </Text>
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
    actions: {
        marginTop: Spacing.lg,
    },
    saveButton: {
        marginBottom: Spacing.sm,
    },
    deleteButton: {
        marginBottom: Spacing.sm,
    },
    modalText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
});

export default DepositoTypeFormScreen;
