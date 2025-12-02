import apiClient from './api';
import {
    DepositoType,
    CreateDepositoTypeDTO,
    UpdateDepositoTypeDTO,
} from '../types/deposito';

// Helper to map backend response to frontend model
const mapToFrontend = (data: any): DepositoType => ({
    id: data.id,
    name: data.name,
    yearlyReturn: Number(data.yearly_return), // Ensure number
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});

export async function getAllDepositoTypes(): Promise<DepositoType[]> {
    try {
        const response = await apiClient.get('/deposito-types');
        return (response.data || []).map(mapToFrontend);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch deposito types');
    }
}

export async function getDepositoTypeById(
    id: string,
): Promise<DepositoType | null> {
    try {
        const response = await apiClient.get(`/deposito-types/${id}`);
        return response.data ? mapToFrontend(response.data) : null;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch deposito type');
    }
}

export async function createDepositoType(
    dto: CreateDepositoTypeDTO,
): Promise<DepositoType> {
    try {
        const response = await apiClient.post('/deposito-types', {
            name: dto.name.trim(),
            yearly_return: dto.yearlyReturn,
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create deposito type');
    }
}

export async function updateDepositoType(
    id: string,
    dto: UpdateDepositoTypeDTO,
): Promise<DepositoType> {
    try {
        const response = await apiClient.put(`/deposito-types/${id}`, {
            name: dto.name.trim(),
            yearly_return: dto.yearlyReturn,
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to update deposito type');
    }
}

export async function deleteDepositoType(id: string): Promise<void> {
    try {
        await apiClient.delete(`/deposito-types/${id}`);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to delete deposito type');
    }
}
