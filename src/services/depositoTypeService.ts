import { getData, setData } from './storage';
import {
    DepositoType,
    CreateDepositoTypeDTO,
    UpdateDepositoTypeDTO,
} from '@types/deposito';
import { v4 as uuidv4 } from 'uuid';
import { dummyDepositoTypes } from './dummy/data';

const STORAGE_KEY = 'depositoTypes';

// Initialize with dummy data on first run
let initialized = false;

async function ensureInitialized(): Promise<void> {
    if (initialized) return;

    const existing = await getData<DepositoType[]>(STORAGE_KEY);
    if (!existing || existing.length === 0) {
        await setData(STORAGE_KEY, dummyDepositoTypes);
    }
    initialized = true;
}

export async function getAllDepositoTypes(): Promise<DepositoType[]> {
    await ensureInitialized();
    try {
        const data = await getData<DepositoType[]>(STORAGE_KEY);
        return data || [];
    } catch (error) {
        throw new Error('Failed to fetch deposito types');
    }
}

export async function getDepositoTypeById(
    id: string,
): Promise<DepositoType | null> {
    const depositoTypes = await getAllDepositoTypes();
    return depositoTypes.find(d => d.id === id) || null;
}

export async function createDepositoType(
    dto: CreateDepositoTypeDTO,
): Promise<DepositoType> {
    try {
        const depositoTypes = await getAllDepositoTypes();

        // Validate
        if (!dto.name || dto.name.trim().length < 3) {
            throw new Error('Deposito type name must be at least 3 characters');
        }

        if (dto.yearlyReturn < 0 || dto.yearlyReturn > 1) {
            throw new Error('Yearly return must be between 0% and 100%');
        }

        const newDepositoType: DepositoType = {
            id: uuidv4(),
            name: dto.name.trim(),
            yearlyReturn: dto.yearlyReturn,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        depositoTypes.push(newDepositoType);
        await setData(STORAGE_KEY, depositoTypes);

        return newDepositoType;
    } catch (error: any) {
        throw error;
    }
}

export async function updateDepositoType(
    id: string,
    dto: UpdateDepositoTypeDTO,
): Promise<DepositoType> {
    try {
        const depositoTypes = await getAllDepositoTypes();
        const index = depositoTypes.findIndex(d => d.id === id);

        if (index === -1) {
            throw new Error('Deposito type not found');
        }

        // Validate
        if (!dto.name || dto.name.trim().length < 3) {
            throw new Error('Deposito type name must be at least 3 characters');
        }

        if (dto.yearlyReturn < 0 || dto.yearlyReturn > 1) {
            throw new Error('Yearly return must be between 0% and 100%');
        }

        depositoTypes[index] = {
            ...depositoTypes[index],
            name: dto.name.trim(),
            yearlyReturn: dto.yearlyReturn,
            updatedAt: new Date(),
        };

        await setData(STORAGE_KEY, depositoTypes);
        return depositoTypes[index];
    } catch (error: any) {
        throw error;
    }
}

export async function deleteDepositoType(id: string): Promise<void> {
    try {
        // TODO: Check if deposito type is used by any accounts
        const depositoTypes = await getAllDepositoTypes();
        const filtered = depositoTypes.filter(d => d.id !== id);

        if (filtered.length === depositoTypes.length) {
            throw new Error('Deposito type not found');
        }

        await setData(STORAGE_KEY, filtered);
    } catch (error: any) {
        throw error;
    }
}
