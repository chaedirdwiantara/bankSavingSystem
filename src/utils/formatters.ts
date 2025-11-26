import { format } from 'date-fns';

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export const formatDate = (date: Date): string => {
    return format(date, 'dd MMM yyyy');
};

export const formatDateTime = (date: Date): string => {
    return format(date, 'dd MMM yyyy HH:mm');
};

export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
};
