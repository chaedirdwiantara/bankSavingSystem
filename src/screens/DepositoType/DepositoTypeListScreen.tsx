import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DepositoStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { depositoActions } from '../../store/slices/depositoSlice';
import { Screen, Card, Button, Loading, EmptyState } from '../../components';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, FontWeights } from '../../constants/typography';
import { formatPercentage } from '../../utils/formatters';

type Props = NativeStackScreenProps<DepositoStackParamList, 'DepositoTypeList'>;

const DepositoTypeListScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { depositoTypes, loading } = useAppSelector(state => state.deposito);

    useEffect(() => {
        dispatch(depositoActions.fetchDepositoTypesRequest());
    }, [dispatch]);

    const handleAdd = () => {
        navigation.navigate('DepositoTypeForm', { mode: 'create' });
    };

    const handlePress = (id: string) => {
        navigation.navigate('DepositoTypeForm', { mode: 'edit', depositoTypeId: id });
    };

    const handleRefresh = () => {
        dispatch(depositoActions.fetchDepositoTypesRequest());
    };

    if (loading && depositoTypes.length === 0) {
        return (
            <Screen>
                <Loading fullScreen />
            </Screen>
        );
    }

    return (
        <Screen>
            <View style={styles.header}>
                <Text style={styles.title}>💰 Deposito Types</Text>
                <Button
                    title="+ Add"
                    onPress={handleAdd}
                    size="sm"
                    style={styles.addButton}
                />
            </View>

            {depositoTypes.length === 0 ? (
                <EmptyState
                    title="No Deposito Types"
                    description="Create your first deposito type configuration"
                    icon="💰"
                    action={
                        <Button title="Add Type" onPress={handleAdd} variant="primary" />
                    }
                />
            ) : (
                <FlatList
                    data={depositoTypes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => handlePress(item.id)} variant="outlined">
                            <View style={styles.cardContent}>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.rate}>
                                        Interest: {formatPercentage(item.yearlyReturn)} / year
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
    name: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    rate: {
        fontSize: FontSizes.base,
        color: Colors.primary,
        fontWeight: FontWeights.medium,
    },
    arrow: {
        fontSize: 24,
        color: Colors.textSecondary,
    },
});

export default DepositoTypeListScreen;
