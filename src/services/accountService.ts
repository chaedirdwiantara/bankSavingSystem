import apiClient from './api';
import { Account, CreateAccountDTO } from '../types/account';

// Helper to map backend response to frontend model
const mapToFrontend = (data: any): Account => ({
    id: data.id,
    customerId: data.customer_id,
    depositoTypeId: data.deposito_type_id,
    balance: Number(data.balance),
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    // Map relations if they exist
    customer: data.customer ? {
        id: data.customer.id,
        name: data.customer.name,
        createdAt: new Date(data.customer.created_at),
        updatedAt: new Date(data.customer.updated_at),
    } : undefined,
    depositoType: data.deposito_type ? {
        id: data.deposito_type.id,
        name: data.deposito_type.name,
        yearlyReturn: Number(data.deposito_type.yearly_return),
        createdAt: new Date(data.deposito_type.created_at),
        updatedAt: new Date(data.deposito_type.updated_at),
    } : undefined,
});

export async function getAllAccounts(): Promise<Account[]> {
    try {
        const response = await apiClient.get('/accounts');
        return (response.data || []).map(mapToFrontend);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch accounts');
    }
}

export async function getAccountById(id: string): Promise<Account | null> {
    try {
        const response = await apiClient.get(`/accounts/${id}`);
        return response.data ? mapToFrontend(response.data) : null;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch account');
    }
}

export async function getAccountsByCustomer(
    customerId: string,
): Promise<Account[]> {
    try {
        const response = await apiClient.get(`/accounts?customer_id=${customerId}`);
        return (response.data || []).map(mapToFrontend);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch accounts');
    }
}

export async function createAccount(dto: CreateAccountDTO): Promise<Account> {
    try {
        const response = await apiClient.post('/accounts', {
            customer_id: dto.customerId,
            deposito_type_id: dto.depositoTypeId,
            initial_balance: dto.initialBalance || 0,
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create account');
    }
}

export async function updateAccountBalance(
    id: string,
    balance: number,
): Promise<Account> {
    try {
        // Note: Backend updates balance through transactions, not directly
        // This function might not be used anymore with API
        const response = await apiClient.get(`/accounts/${id}`);
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to update account balance');
    }
}

export async function deleteAccount(id: string): Promise<void> {
    try {
        await apiClient.delete(`/accounts/${id}`);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to delete account');
    }
}
