import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TextInput,
} from 'react-native';
import { Colors } from '@constants/colors';
import { FontSizes, FontWeights } from '@constants/typography';
import { Spacing, BorderRadius } from '@constants/spacing';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    containerStyle?: ViewStyle;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    required = false,
    containerStyle,
    prefix,
    suffix,
    style,
    ...rest
}) => {
    const hasError = !!error;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        {label}
                        {required && <Text style={styles.required}> *</Text>}
                    </Text>
                </View>
            )}

            <View
                style={[
                    styles.inputContainer,
                    hasError && styles.inputContainer_error,
                    rest.editable === false && styles.inputContainer_disabled,
                ]}>
                {prefix && (
                    <View style={styles.prefix}>
                        {typeof prefix === 'string' ? (
                            <Text style={styles.affixText}>{prefix}</Text>
                        ) : (
                            prefix
                        )}
                    </View>
                )}

                <TextInput
                    style={[
                        styles.input,
                        prefix ? styles.input_withPrefix : undefined,
                        suffix ? styles.input_withSuffix : undefined,
                        style,
                    ]}
                    placeholderTextColor={Colors.textDisabled}
                    {...rest}
                />

                {suffix && (
                    <View style={styles.suffix}>
                        {typeof suffix === 'string' ? (
                            <Text style={styles.affixText}>{suffix}</Text>
                        ) : (
                            suffix
                        )}
                    </View>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {!error && helperText && (
                <Text style={styles.helperText}>{helperText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    labelContainer: {
        marginBottom: Spacing.xs,
    },
    label: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: Colors.textPrimary,
    },
    required: {
        color: Colors.error,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background,
        height: 52,
    },
    inputContainer_error: {
        borderColor: Colors.error,
    },
    inputContainer_disabled: {
        backgroundColor: Colors.surface,
    },
    input: {
        flex: 1,
        height: 52,
        paddingHorizontal: Spacing.md,
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
        textAlignVertical: 'center',
    },
    input_withPrefix: {
        paddingLeft: 0,
    },
    input_withSuffix: {
        paddingRight: 0,
    },
    prefix: {
        paddingLeft: Spacing.md,
    },
    suffix: {
        paddingRight: Spacing.md,
    },
    errorText: {
        fontSize: FontSizes.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
    helperText: {
        fontSize: FontSizes.xs,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    affixText: {
        fontSize: FontSizes.base,
        color: Colors.textPrimary,
    },
});
