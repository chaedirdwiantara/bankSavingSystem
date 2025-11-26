import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Input } from '../common/Input';
import { Colors } from '@constants/colors';
import { formatDate } from '@utils/formatters';

interface DateInputProps {
    label?: string;
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
    required?: boolean;
    minimumDate?: Date;
    maximumDate?: Date;
}

export const DateInput: React.FC<DateInputProps> = ({
    label,
    value,
    onChange,
    error,
    required,
    minimumDate,
    maximumDate,
}) => {
    const [show, setShow] = useState(false);

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <>
            <TouchableOpacity onPress={showDatePicker}>
                <Input
                    label={label}
                    value={formatDate(value)}
                    editable={false}
                    error={error}
                    required={required}
                    suffix={<Text style={styles.icon}>📅</Text>}
                    pointerEvents="none"
                />
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
    },
});
