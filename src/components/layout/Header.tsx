import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@constants/colors';
import { FontSizes, FontWeights } from '@constants/typography';
import { Spacing } from '@constants/spacing';

interface HeaderProps {
    title: string;
    subtitle?: string;
    leftAction?: {
        icon: string; // Emoji or future icon
        onPress: () => void;
    };
    rightAction?: {
        icon: string;
        onPress: () => void;
    };
}

export const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    leftAction,
    rightAction,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                {leftAction && (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={leftAction.onPress}>
                        <Text style={styles.actionIcon}>{leftAction.icon}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.centerSection}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>

            <View style={styles.rightSection}>
                {rightAction && (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={rightAction.onPress}>
                        <Text style={styles.actionIcon}>{rightAction.icon}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        minHeight: 56,
    },
    leftSection: {
        width: 48,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        width: 48,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    actionButton: {
        padding: Spacing.xs,
    },
    actionIcon: {
        fontSize: 24,
    },
});
