import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors } from '@constants/colors';
import { FontSizes, FontWeights } from '@constants/typography';
import { Spacing, BorderRadius } from '@constants/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
}) => {
    const isDisabled = disabled || loading;

    const buttonStyle: ViewStyle[] = [
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
    ];

    const textStyle: TextStyle[] = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        isDisabled && styles.text_disabled,
    ];

    const getLoaderColor = (): string => {
        if (variant === 'outline' || variant === 'ghost') {
            return Colors.primary;
        }
        return Colors.background;
    };

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}>
            {loading ? (
                <ActivityIndicator color={getLoaderColor()} size="small" />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },

    // Variants
    button_primary: {
        backgroundColor: Colors.primary,
    },
    button_secondary: {
        backgroundColor: Colors.secondary,
    },
    button_outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },
    button_ghost: {
        backgroundColor: 'transparent',
    },
    button_danger: {
        backgroundColor: Colors.error,
    },

    // Sizes
    button_sm: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 36,
    },
    button_md: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        minHeight: 44,
    },
    button_lg: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        minHeight: 52,
    },

    // Text styles
    text: {
        textAlign: 'center',
    },
    text_primary: {
        color: Colors.background,
        fontWeight: FontWeights.semibold,
    },
    text_secondary: {
        color: Colors.background,
        fontWeight: FontWeights.semibold,
    },
    text_outline: {
        color: Colors.primary,
        fontWeight: FontWeights.semibold,
    },
    text_ghost: {
        color: Colors.primary,
        fontWeight: FontWeights.medium,
    },
    text_danger: {
        color: Colors.background,
        fontWeight: FontWeights.semibold,
    },
    text_disabled: {
        color: Colors.textDisabled,
    },

    // Text sizes
    text_sm: {
        fontSize: FontSizes.sm,
    },
    text_md: {
        fontSize: FontSizes.base,
    },
    text_lg: {
        fontSize: FontSizes.lg,
    },
});
