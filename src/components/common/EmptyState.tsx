import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@constants/colors';
import { FontSizes, FontWeights } from '@constants/typography';
import { Spacing } from '@constants/spacing';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: string; // Will use emoji or future image asset
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon = '📭',
    action,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
            {action && <View style={styles.action}>{action}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing['2xl'],
    },
    icon: {
        fontSize: 64,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    description: {
        fontSize: FontSizes.base,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    action: {
        marginTop: Spacing.md,
    },
});
