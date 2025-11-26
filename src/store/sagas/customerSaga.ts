import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerActions } from '../slices/customerSlice';
import * as customerService from '@services/customerService';
import { Customer } from '@types/customer';

// Worker Saga: fetch customers
function* fetchCustomersSaga() {
    try {
        const customers: Customer[] = yield call(customerService.getAllCustomers);
        yield put(customerActions.fetchCustomersSuccess(customers));
    } catch (error: any) {
        yield put(customerActions.fetchCustomersFailure(error.message));
    }
}

// Worker Saga: create customer
function* createCustomerSaga(action: PayloadAction<{ name: string }>) {
    try {
        const newCustomer: Customer = yield call(
            customerService.createCustomer,
            action.payload,
        );
        yield put(customerActions.createCustomerSuccess(newCustomer));
    } catch (error: any) {
        yield put(customerActions.createCustomerFailure(error.message));
    }
}

// Worker Saga: update customer
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
    } catch (error: any) {
        yield put(customerActions.updateCustomerFailure(error.message));
    }
}

// Worker Saga: delete customer
function* deleteCustomerSaga(action: PayloadAction<string>) {
    try {
        yield call(customerService.deleteCustomer, action.payload);
        yield put(customerActions.deleteCustomerSuccess(action.payload));
    } catch (error: any) {
        yield put(customerActions.deleteCustomerFailure(error.message));
    }
}

// Watcher Saga
export function* customerSaga() {
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
