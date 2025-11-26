import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { accountActions } from '../slices/accountSlice';
import * as accountService from '@services/accountService';
import { Account } from '@types/account';

// Worker Saga: fetch accounts
function* fetchAccountsSaga() {
    try {
        const accounts: Account[] = yield call(accountService.getAllAccounts);
        yield put(accountActions.fetchAccountsSuccess(accounts));
    } catch (error: any) {
        yield put(accountActions.fetchAccountsFailure(error.message));
    }
}

// Worker Saga: create account
function* createAccountSaga(
    action: PayloadAction<{
        customerId: string;
        depositoTypeId: string;
        initialBalance?: number;
    }>,
) {
    try {
        const newAccount: Account = yield call(
            accountService.createAccount,
            action.payload,
        );
        yield put(accountActions.createAccountSuccess(newAccount));
    } catch (error: any) {
        yield put(accountActions.createAccountFailure(error.message));
    }
}

// Worker Saga: delete account
function* deleteAccountSaga(action: PayloadAction<string>) {
    try {
        yield call(accountService.deleteAccount, action.payload);
        yield put(accountActions.deleteAccountSuccess(action.payload));
    } catch (error: any) {
        yield put(accountActions.deleteAccountFailure(error.message));
    }
}

// Watcher Saga
export function* accountSaga() {
    yield takeLatest(accountActions.fetchAccountsRequest.type, fetchAccountsSaga);
    yield takeLatest(accountActions.createAccountRequest.type, createAccountSaga);
    yield takeLatest(accountActions.deleteAccountRequest.type, deleteAccountSaga);
}
