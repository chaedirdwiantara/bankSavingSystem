import { DepositoType } from '../../types/deposito';
import { Customer } from '../../types/customer';

export const dummyDepositoTypes: DepositoType[] = [
    {
        id: 'deposito-1',
        name: 'Deposito Bronze',
        yearlyReturn: 0.03, // 3%
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'deposito-2',
        name: 'Deposito Silver',
        yearlyReturn: 0.05, // 5%
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'deposito-3',
        name: 'Deposito Gold',
        yearlyReturn: 0.07, // 7%
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];

export const dummyCustomers: Customer[] = [
    {
        id: 'customer-1',
        name: 'John Doe',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: 'customer-2',
        name: 'Jane Smith',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
    },
    {
        id: 'customer-3',
        name: 'Robert Johnson',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
    },
];
