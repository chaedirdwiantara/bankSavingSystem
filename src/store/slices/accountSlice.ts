import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '@types/account';

interface AccountState {
    accounts: Account[];
    selectedAccount: Account | null;
    loading: boolean;
    error: string | null;
}

const initialState: AccountState = {
    accounts: [],
    selectedAccount: null,
    loading: false,
    error: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // Fetch Accounts
        fetchAccountsRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchAccountsSuccess: (state, action: PayloadAction<Account[]>) => {
            state.accounts = action.payload;
            state.loading = false;
        },
        fetchAccountsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Account
        createAccountRequest: (
            state,
            _action: PayloadAction<{
                customerId: string;
                depositoTypeId: string;
                initialBalance?: number;
            }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        createAccountSuccess: (state, action: PayloadAction<Account>) => {
            state.accounts.push(action.payload);
            state.loading = false;
        },
        createAccountFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Account
        deleteAccountRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteAccountSuccess: (state, action: PayloadAction<string>) => {
            state.accounts = state.accounts.filter(a => a.id !== action.payload);
            state.loading = false;
        },
        deleteAccountFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update Account Balance (internal use by transactions)
        updateAccountBalance: (
            state,
            action: PayloadAction<{ id: string; balance: number }>,
        ) => {
            const index = state.accounts.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.accounts[index].balance = action.payload.balance;
                state.accounts[index].updatedAt = new Date();
            }
        },

        // Select Account
        selectAccount: (state, action: PayloadAction<Account | null>) => {
            state.selectedAccount = action.payload;
        },

        // Clear Error
        clearAccountError: state => {
            state.error = null;
        },
    },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
