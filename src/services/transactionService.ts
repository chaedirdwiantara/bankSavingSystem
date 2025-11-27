
export async function getTransactionsByAccount(
    accountId: string,
): Promise<Transaction[]> {
    try {
        const data = await getData<Transaction[]>(STORAGE_KEY);
        const allTransactions = data || [];
        return allTransactions
            .filter(t => t.accountId === accountId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        throw new Error('Failed to fetch transactions');
    }
}

export async function createDeposit(
    dto: CreateDepositDTO,
): Promise<Transaction> {
    try {
        const account = await getAccountById(dto.accountId);
        if (!account) {
            throw new Error('Account not found');
        }

        if (dto.amount <= 0) {
            throw new Error('Deposit amount must be greater than 0');
        }

        const balanceBefore = account.balance;
        const balanceAfter = balanceBefore + dto.amount;

        const transaction: Transaction = {
            id: uuidv4(),
            accountId: dto.accountId,
            type: TransactionType.DEPOSIT,
            amount: dto.amount,
            date: dto.depositDate,
            balanceBefore,
            balanceAfter,
            createdAt: new Date(),
        };

        // Save transaction
        const transactions = (await getData<Transaction[]>(STORAGE_KEY)) || [];
        transactions.push(transaction);
        await setData(STORAGE_KEY, transactions);

        // Update account balance
        await updateAccountBalance(dto.accountId, balanceAfter);

        return transaction;
    } catch (error: any) {
        throw error;
    }
}

export async function createWithdrawal(
    dto: CreateWithdrawalDTO,
): Promise<Transaction> {
    try {
        const account = await getAccountById(dto.accountId);
        if (!account) {
            throw new Error('Account not found');
        }

        if (dto.amount <= 0) {
            throw new Error('Withdrawal amount must be greater than 0');
        }

        // Get deposito type for interest calculation
        const depositoType = await getDepositoTypeById(account.depositoTypeId);
        if (!depositoType) {
            throw new Error('Deposito type not found');
        }

        // Get the last deposit transaction date
        const transactions = await getTransactionsByAccount(dto.accountId);
        const lastDeposit = transactions.find(
            t => t.type === TransactionType.DEPOSIT,
        );

        if (!lastDeposit) {
            throw new Error('No deposit found for this account');
        }

        // Calculate interest
        const interestCalc = calculateInterest(
            account.balance,
            new Date(lastDeposit.date),
            dto.withdrawalDate,
            depositoType.yearlyReturn,
        );

        // Check if withdrawal amount exceeds ending balance
        if (dto.amount > interestCalc.endingBalance) {
            throw new Error(
                `Insufficient balance. Available: Rp ${interestCalc.endingBalance.toFixed(0)} (including interest)`,
            );
        }

        const balanceBefore = account.balance;
        const balanceAfter = interestCalc.endingBalance - dto.amount;

        const transaction: Transaction = {
            id: uuidv4(),
            accountId: dto.accountId,
            type: TransactionType.WITHDRAWAL,
            amount: dto.amount,
            date: dto.withdrawalDate,
            balanceBefore,
            balanceAfter,
            interestEarned: interestCalc.interestEarned,
            monthsHeld: interestCalc.monthsHeld,
            createdAt: new Date(),
        };

        // Save transaction
        const allTransactions = (await getData<Transaction[]>(STORAGE_KEY)) || [];
        allTransactions.push(transaction);
        await setData(STORAGE_KEY, allTransactions);

        // Update account balance
        await updateAccountBalance(dto.accountId, balanceAfter);

        return transaction;
    } catch (error: any) {
        throw error;
    }
}
