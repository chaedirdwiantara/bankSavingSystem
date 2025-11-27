import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types/customer';

interface CustomerState {
    customers: Customer[];
    selectedCustomer: Customer | null;
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        // Fetch Customers
        fetchCustomersRequest: state => {
            state.loading = true;
            state.error = null;
        },
        fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
            state.loading = false;
        },
        fetchCustomersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Customer
        createCustomerRequest: (state, _action: PayloadAction<{ name: string }>) => {
            state.loading = true;
            state.error = null;
        },
        createCustomerSuccess: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
            state.loading = false;
        },
        createCustomerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update Customer
        updateCustomerRequest: (
            state,
            _action: PayloadAction<{ id: string; name: string }>,
        ) => {
            state.loading = true;
            state.error = null;
        },
        updateCustomerSuccess: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
            state.loading = false;
        },
        updateCustomerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Customer
        deleteCustomerRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteCustomerSuccess: state => {
            state.loading = false;
        },
        deleteCustomerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Select Customer
        selectCustomer: (state, action: PayloadAction<Customer | null>) => {
            state.selectedCustomer = action.payload;
        },

        // Clear Error
        clearCustomerError: state => {
            state.error = null;
        },
    },
});

export const customerActions = customerSlice.actions;
export default customerSlice.reducer;
