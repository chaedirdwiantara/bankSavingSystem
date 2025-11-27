import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as customerService from '../../services/customerService';
import { customerActions } from '../slices/customerSlice';
import { Customer } from '../../types/customer';

function* fetchCustomersSaga() {
    try {
        const customers: Customer[] = yield call(
            customerService.getAllCustomers,
        );
        yield put(customerActions.fetchCustomersSuccess(customers));
    } catch (error: any) {
        yield put(
            customerActions.fetchCustomersFailure(
                error.message || 'Failed to fetch customers',
            ),
        );
    }
}

function* createCustomerSaga(
    action: PayloadAction<{ name: string }>,
) {
    try {
        const newCustomer: Customer = yield call(
            customerService.createCustomer,
            action.payload,
        );
        yield put(customerActions.createCustomerSuccess(newCustomer));
        // Refresh list
        yield put(customerActions.fetchCustomersRequest());
    } catch (error: any) {
        yield put(
            customerActions.createCustomerFailure(
                error.message || 'Failed to create customer',
            ),
        );
    }
}

function* updateCustomerSaga(
    action: PayloadAction<{ id: string; name: string }>,
) {
    try {
        const updatedCustomer: Customer = yield call(
            customerService.updateCustomer,
            action.payload.id,
            { name: action.payload.name },
        );
        yield put(customerActions.updateCustomerSuccess(updatedCustomer));
        // Refresh list
        yield put(customerActions.fetchCustomersRequest());
    } catch (error: any) {
        yield put(
            customerActions.updateCustomerFailure(
                error.message || 'Failed to update customer',
            ),
        );
    }
}

function* deleteCustomerSaga(action: PayloadAction<string>) {
    try {
        yield call(customerService.deleteCustomer, action.payload);
        yield put(customerActions.deleteCustomerSuccess());
        // Refresh list
        yield put(customerActions.fetchCustomersRequest());
    } catch (error: any) {
        yield put(
            customerActions.deleteCustomerFailure(
                error.message || 'Failed to delete customer',
            ),
        );
    }
}

export default function* customerSaga() {
    yield takeLatest(
        customerActions.fetchCustomersRequest.type,
        fetchCustomersSaga,
    );
    yield takeLatest(
        customerActions.createCustomerRequest.type,
        createCustomerSaga,
    );
    yield takeLatest(
        customerActions.updateCustomerRequest.type,
        updateCustomerSaga,
    );
    yield takeLatest(
        customerActions.deleteCustomerRequest.type,
        deleteCustomerSaga,
    );
}
