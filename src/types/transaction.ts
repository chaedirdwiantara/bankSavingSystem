export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
}

export interface Transaction {
    id: string;
    accountId: string;
    type: TransactionType;
    amount: number;
    date: Date;
    balanceBefore: number;
    balanceAfter: number;
    interestEarned?: number;  // For withdrawals
    monthsHeld?: number;       // For withdrawals
    createdAt: Date;
}

export interface CreateDepositDTO {
    accountId: string;
    amount: number;
    depositDate: Date;
}

export interface CreateWithdrawalDTO {
    accountId: string;
    amount: number;
    withdrawalDate: Date;
}
