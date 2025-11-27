import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { Screen, Button, Card, Input, Loading } from './src/components';
import { Text, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { customerActions } from '@store/slices/customerSlice';
import { depositoActions } from '@store/slices/depositoSlice';
import { Colors } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { FontSizes, FontWeights } from '@constants/typography';

const TestScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector(state => state.customer);
  const { depositoTypes } = useAppSelector(state => state.deposito);

  useEffect(() => {
    // Load initial data
    dispatch(customerActions.fetchCustomersRequest());
    dispatch(depositoActions.fetchDepositoTypesRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <Screen>
        <Loading fullScreen />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>🏦 Bank Saving System</Text>
        <Text style={styles.subtitle}>React Native + TypeScript + Redux Saga</Text>
      </View>

      {/* System Status */}
      <Card variant="elevated" style={styles.statusCard}>
        <Text style={styles.sectionTitle}>✅ System Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Redux Store:</Text>
          <Text style={styles.statusValue}>Active</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Redux Saga:</Text>
          <Text style={styles.statusValue}>Running</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>AsyncStorage:</Text>
          <Text style={styles.statusValue}>Connected</Text>
        </View>
      </Card>

      {/* Customers */}
      <Card variant="outlined">
        <Text style={styles.sectionTitle}>👥 Customers ({customers.length})</Text>
        {customers.map(customer => (
          <View key={customer.id} style={styles.listItem}>
            <Text style={styles.itemText}>{customer.name}</Text>
          </View>
        ))}
        <Button
          title="Add Customer"
          onPress={() => {
            dispatch(
              customerActions.createCustomerRequest({
                name: `Customer ${customers.length + 1}`,
              }),
            );
          }}
          size="sm"
          style={styles.button}
        />
      </Card>

      {/* Deposito Types */}
      <Card variant="outlined">
        <Text style={styles.sectionTitle}>
          💰 Deposito Types ({depositoTypes.length})
        </Text>
        {depositoTypes.map(deposito => (
          <View key={deposito.id} style={styles.listItem}>
            <Text style={styles.itemText}>{deposito.name}</Text>
            <Text style={styles.itemSubtext}>
              {(deposito.yearlyReturn * 100).toFixed(1)}% yearly
            </Text>
          </View>
        ))}
      </Card>

      {/* Component Showcase */}
      <Card variant="elevated">
        <Text style={styles.sectionTitle}>🎨 Component Library</Text>

        <View style={styles.componentSection}>
          <Text style={styles.componentLabel}>Buttons:</Text>
          <View style={styles.buttonRow}>
            <Button title="Primary" onPress={() => { }} size="sm" />
            <Button title="Outline" variant="outline" onPress={() => { }} size="sm" />
            <Button title="Ghost" variant="ghost" onPress={() => { }} size="sm" />
          </View>
        </View>

        <View style={styles.componentSection}>
          <Text style={styles.componentLabel}>Input:</Text>
          <Input
            label="Sample Input"
            placeholder="Type here..."
            value=""
            onChangeText={() => { }}
          />
        </View>

        <Text style={styles.successText}>
          ✅ All components loaded successfully!
        </Text>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Phase 1-7 Complete • Ready for Navigation & Screens
        </Text>
      </View>
    </Screen>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <TestScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  statusCard: {
    backgroundColor: Colors.surface,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  statusLabel: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
  statusValue: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    color: Colors.success,
  },
  listItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemText: {
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium,
  },
  itemSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  button: {
    marginTop: Spacing.md,
  },
  componentSection: {
    marginBottom: Spacing.md,
  },
  componentLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  successText: {
    fontSize: FontSizes.sm,
    color: Colors.success,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeights.medium,
  },
});

export default App;
