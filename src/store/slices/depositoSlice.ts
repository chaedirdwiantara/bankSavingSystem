import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepositoType } from '@types/deposito';

interface DepositoState {
    depositoTypes: DepositoType[];
    selectedDepositoType: DepositoType | null;
    loading: boolean;
    error: string | null;
}

const initialState: DepositoState = {
    depositoTypes: [],
    selectedDepositoType: null,
    loading: false,
    error: null,
};

const depositoSlice = createSlice({
    name: 'deposito',
    initialState,
    reducers: {
        // Fetch Deposito Types
        fetchDepositoTypesRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchDepositoTypesSuccess: (
            state,
            action: PayloadAction<DepositoType[]>,
        ) => {
            state.depositoTypes = action.payload;
            state.loading = false;
        },
        fetchDepositoTypesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Deposito Type
        createDepositoTypeRequest: (
            state,
            _action: PayloadAction<{ name: string; yearlyReturn: number }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        createDepositoTypeSuccess: (state, action: PayloadAction<DepositoType>) => {
            state.depositoTypes.push(action.payload);
            state.loading = false;
        },
        createDepositoTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update Deposito Type
        updateDepositoTypeRequest: (
            state,
            _action: PayloadAction<{
                id: string;
                name: string;
                yearlyReturn: number;
            }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        updateDepositoTypeSuccess: (state, action: PayloadAction<DepositoType>) => {
            const index = state.depositoTypes.findIndex(
                d => d.id === action.payload.id,
            );
            if (index !== -1) {
                state.depositoTypes[index] = action.payload;
            }
            state.loading = false;
        },
        updateDepositoTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Deposito Type
        deleteDepositoTypeRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteDepositoTypeSuccess: (state, action: PayloadAction<string>) => {
            state.depositoTypes = state.depositoTypes.filter(
                d => d.id !== action.payload,
            );
            state.loading = false;
        },
        deleteDepositoTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Select Deposito Type
        selectDepositoType: (state, action: PayloadAction<DepositoType | null>) => {
            state.selectedDepositoType = action.payload;
        },

        // Clear Error
        clearDepositoError: state => {
            state.error = null;
        },
    },
});

export const depositoActions = depositoSlice.actions;
export default depositoSlice.reducer;
