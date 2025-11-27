const data = await getData<Account[]>(STORAGE_KEY);
return data || [];
    } catch (error) {
    throw new Error('Failed to fetch accounts');
}
}

export async function getAccountById(id: string): Promise<Account | null> {
    const accounts = await getAllAccounts();
    return accounts.find(a => a.id === id) || null;
}

export async function getAccountsByCustomer(
    customerId: string,
): Promise<Account[]> {
    const accounts = await getAllAccounts();
    return accounts.filter(a => a.customerId === customerId);
}

export async function createAccount(dto: CreateAccountDTO): Promise<Account> {
    try {
        const accounts = await getAllAccounts();

        // Validate: One customer can only have one account per deposito type
        const existingAccount = accounts.find(
            acc =>
                acc.customerId === dto.customerId &&
                acc.depositoTypeId === dto.depositoTypeId,
        );

        if (existingAccount) {
            throw new Error(
                'Customer already has an account with this deposito type',
            );
        }

        const newAccount: Account = {
            id: uuidv4(),
            customerId: dto.customerId,
            depositoTypeId: dto.depositoTypeId,
            balance: dto.initialBalance || 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        accounts.push(newAccount);
        await setData(STORAGE_KEY, accounts);

        return newAccount;
    } catch (error: any) {
        throw error;
    }
}

export async function updateAccountBalance(
    id: string,
    balance: number,
): Promise<Account> {
    try {
        const accounts = await getAllAccounts();
        const index = accounts.findIndex(a => a.id === id);

        if (index === -1) {
            throw new Error('Account not found');
        }

        accounts[index] = {
            ...accounts[index],
            balance,
            updatedAt: new Date(),
        };

        await setData(STORAGE_KEY, accounts);
        return accounts[index];
    } catch (error: any) {
        throw error;
    }
}

export async function deleteAccount(id: string): Promise<void> {
    try {
        const account = await getAccountById(id);

        if (!account) {
            throw new Error('Account not found');
        }

        // Check if account has balance
        if (account.balance > 0) {
            throw new Error('Cannot delete account with positive balance. Please withdraw all funds first.');
        }

        const accounts = await getAllAccounts();
        const filtered = accounts.filter(a => a.id !== id);

        await setData(STORAGE_KEY, filtered);
    } catch (error: any) {
        throw error;
    }
}
