import apiClient from './api';
import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '../types/customer';

// Helper to map backend response to frontend model
const mapToFrontend = (data: any): Customer => ({
    id: data.id,
    name: data.name,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});

export async function getAllCustomers(): Promise<Customer[]> {
    try {
        const response = await apiClient.get('/customers');
        return (response.data || []).map(mapToFrontend);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch customers');
    }
}

export async function getCustomerById(id: string): Promise<Customer | null> {
    try {
        const response = await apiClient.get(`/customers/${id}`);
        return response.data ? mapToFrontend(response.data) : null;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch customer');
    }
}

export async function createCustomer(
    dto: CreateCustomerDTO,
): Promise<Customer> {
    try {
        const response = await apiClient.post('/customers', {
            name: dto.name.trim(),
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create customer');
    }
}

export async function updateCustomer(
    id: string,
    dto: UpdateCustomerDTO,
): Promise<Customer> {
    try {
        const response = await apiClient.put(`/customers/${id}`, {
            name: dto.name.trim(),
        });
        return mapToFrontend(response.data);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to update customer');
    }
}

export async function deleteCustomer(id: string): Promise<void> {
    try {
        await apiClient.delete(`/customers/${id}`);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to delete customer');
    }
}
