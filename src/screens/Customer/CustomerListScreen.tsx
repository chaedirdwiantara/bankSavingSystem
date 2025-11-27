import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { customerActions } from '../../store/slices/customerSlice';
import { Screen, Card, Button, Loading, EmptyState } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatDate } from '../../utils/formatters';

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerList'>;

const CustomerListScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { customers, loading } = useAppSelector(state => state.customer);

    useEffect(() => {
        dispatch(customerActions.fetchCustomersRequest());
    }, [dispatch]);

    const handleAdd = () => {
        navigation.navigate('CustomerForm', { mode: 'create' });
    };

    const handleCustomerPress = (customerId: string) => {
        navigation.navigate('CustomerDetail', { customerId });
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
                <Text style={styles.title}>👥 Customers</Text>
                <Button
                    title="+ Add"
                    onPress={handleAdd}
                    size="sm"
                    style={styles.addButton}
                />
            </View>

            {customers.length === 0 ? (
                <EmptyState
                    title="No Customers Yet"
                    description="Start by adding your first customer"
                    icon="👤"
                    action={
                        <Button title="Add Customer" onPress={handleAdd} variant="primary" />
                    }
                />
            ) : (
                <FlatList
                    data={customers}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => handleCustomerPress(item.id)} variant="outlined">
                            <View style={styles.customerCard}>
                                <View style={styles.customerInfo}>
                                    <Text style={styles.customerName}>{item.name}</Text>
                                    <Text style={styles.customerDate}>
                                        Created: {formatDate(item.createdAt)}
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
    customerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    customerDate: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
    },
    arrow: {
        fontSize: 24,
        color: Colors.textSecondary,
    },
});

export default CustomerListScreen;
