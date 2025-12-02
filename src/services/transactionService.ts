import apiClient from './api';
import {
    Transaction,
    TransactionType,
    CreateDepositDTO,
    CreateWithdrawalDTO,
} from '../types/transaction';

// Helper to map backend response to frontend model
const mapToFrontend = (data: any): Transaction => ({
    id: data.id,
    accountId: data.account_id,
    type: data.type as TransactionType,
    amount: Number(data.amount),
    date: new Date(data.transaction_date),
    balanceBefore: Number(data.balance_before),
    balanceAfter: Number(data.balance_after),
    interestEarned: data.interest_earned ? Number(data.interest_earned) : undefined,
    monthsHeld: data.months_held ? Number(data.months_held) : undefined,
    createdAt: new Date(data.created_at),
});

export async function getTransactionsByAccount(
    accountId: string,
): Promise<Transaction[]> {
    try {
        const response = await apiClient.get(`/transactions?account_id=${accountId}`);
        return (response.data || []).map(mapToFrontend);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch transactions');
    }
}

export async function createDeposit(
    dto: CreateDepositDTO,
): Promise<Transaction> {
    try {
        const response = await apiClient.post('/transactions/deposit', {
            account_id: dto.accountId,
            amount: dto.amount,
            transaction_date: dto.depositDate.toISOString(),
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create deposit');
    }
}

export async function createWithdrawal(
    dto: CreateWithdrawalDTO,
): Promise<Transaction> {
    try {
        const response = await apiClient.post('/transactions/withdrawal', {
            account_id: dto.accountId,
            amount: dto.amount,
            transaction_date: dto.withdrawalDate.toISOString(),
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create withdrawal');
    }
}
