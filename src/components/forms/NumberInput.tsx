import React from 'react';
import { Text, StyleSheet, TextInputProps } from 'react-native';
import { Input } from '../common/Input';
import { formatCurrency } from '@utils/formatters';

interface NumberInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    label?: string;
    value: number;
    onChange: (value: number) => void;
    error?: string;
    required?: boolean;
    isCurrency?: boolean;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
    label,
    value,
    onChange,
    error,
    required,
    isCurrency = false,
    prefix = 'Rp',
    suffix,
    min,
    max,
    ...rest
}) => {
    const [displayValue, setDisplayValue] = React.useState(
        value.toString().replace(/\D/g, ''),
    );

    const handleChangeText = (text: string) => {
        // Remove non-numeric characters
        const numericValue = text.replace(/\D/g, '');

        // Convert to number
        const numberValue = parseInt(numericValue || '0', 10);

        // Apply min/max constraints
        let constrainedValue = numberValue;
        if (min !== undefined && numberValue < min) {
            constrainedValue = min;
        }
        if (max !== undefined && numberValue > max) {
            constrainedValue = max;
        }

        setDisplayValue(numericValue);
        onChange(constrainedValue);
    };

    const formatDisplayValue = () => {
        if (!displayValue) return '';

        if (isCurrency) {
            // Format with thousand separators
            return parseInt(displayValue, 10).toLocaleString('id-ID');
        }

        return displayValue;
    };

    return (
        <Input
            label={label}
            value={formatDisplayValue()}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            error={error}
            required={required}
            prefix={isCurrency && <Text style={styles.prefix}>{prefix}</Text>}
            suffix={suffix && <Text style={styles.suffix}>{suffix}</Text>}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    prefix: {
        fontSize: 16,
        fontWeight: '600',
    },
    suffix: {
        fontSize: 16,
        fontWeight: '600',
    },
});
