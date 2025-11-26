import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors } from '@constants/colors';
import { Spacing, BorderRadius } from '@constants/spacing';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
    variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    style,
    variant = 'default',
}) => {
    const cardStyle = [
        styles.card,
        styles[`card_${variant}`],
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                style={cardStyle}
                onPress={onPress}
                activeOpacity={0.7}>
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    card_default: {
        backgroundColor: Colors.surface,
    },
    card_outlined: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    card_elevated: {
        backgroundColor: Colors.background,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
});
