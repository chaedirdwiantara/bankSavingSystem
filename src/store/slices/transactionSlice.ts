import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@types/transaction';

interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        // Fetch Transactions
        fetchTransactionsRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
            state.loading = false;
        },
        fetchTransactionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Deposit
        createDepositRequest: (
            state,
            _action: PayloadAction<{
                accountId: string;
                amount: number;
                depositDate: Date;
            }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        createDepositSuccess: (state, action: PayloadAction<Transaction>) => {
            state.transactions.unshift(action.payload); // Add to beginning
            state.loading = false;
        },
        createDepositFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Withdrawal
        createWithdrawalRequest: (
            state,
            _action: PayloadAction<{
                accountId: string;
                amount: number;
                withdrawalDate: Date;
            }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        createWithdrawalSuccess: (state, action: PayloadAction<Transaction>) => {
            state.transactions.unshift(action.payload); // Add to beginning
            state.loading = false;
        },
        createWithdrawalFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Clear Error
        clearTransactionError: state => {
            state.error = null;
        },

        // Clear Transactions (when switching accounts)
        clearTransactions: state => {
            state.transactions = [];
        },
    },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
