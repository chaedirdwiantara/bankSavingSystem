import { getData, setData } from './storage';
import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '@types/customer';
import { v4 as uuidv4 } from 'uuid';
import { dummyCustomers } from './dummy/data';

const STORAGE_KEY = 'customers';

// Initialize with dummy data on first run
let initialized = false;

async function ensureInitialized(): Promise<void> {
    if (initialized) return;

    const existing = await getData<Customer[]>(STORAGE_KEY);
    if (!existing || existing.length === 0) {
        await setData(STORAGE_KEY, dummyCustomers);
    }
    initialized = true;
}

export async function getAllCustomers(): Promise<Customer[]> {
    await ensureInitialized();
    try {
        const data = await getData<Customer[]>(STORAGE_KEY);
        return data || [];
    } catch (error) {
        throw new Error('Failed to fetch customers');
    }
}

export async function getCustomerById(id: string): Promise<Customer | null> {
    const customers = await getAllCustomers();
    return customers.find(c => c.id === id) || null;
}

export async function createCustomer(
    dto: CreateCustomerDTO,
): Promise<Customer> {
    try {
        const customers = await getAllCustomers();

        // Validate name
        if (!dto.name || dto.name.trim().length < 3) {
            throw new Error('Customer name must be at least 3 characters');
        }

        const newCustomer: Customer = {
            id: uuidv4(),
            name: dto.name.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        customers.push(newCustomer);
        await setData(STORAGE_KEY, customers);

        return newCustomer;
    } catch (error: any) {
        throw error;
    }
}

export async function updateCustomer(
    id: string,
    dto: UpdateCustomerDTO,
): Promise<Customer> {
    try {
        const customers = await getAllCustomers();
        const index = customers.findIndex(c => c.id === id);

        if (index === -1) {
            throw new Error('Customer not found');
        }

        // Validate name
        if (!dto.name || dto.name.trim().length < 3) {
            throw new Error('Customer name must be at least 3 characters');
        }

        customers[index] = {
            ...customers[index],
            name: dto.name.trim(),
            updatedAt: new Date(),
        };

        await setData(STORAGE_KEY, customers);
        return customers[index];
    } catch (error: any) {
        throw error;
    }
}

export async function deleteCustomer(id: string): Promise<void> {
    try {
        // Check if customer has accounts (import accountService to check)
        // For now, just delete
        const customers = await getAllCustomers();
        const filtered = customers.filter(c => c.id !== id);

        if (filtered.length === customers.length) {
            throw new Error('Customer not found');
        }

        await setData(STORAGE_KEY, filtered);
    } catch (error: any) {
        throw error;
    }
}
