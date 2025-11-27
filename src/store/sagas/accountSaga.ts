import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as accountService from '../../services/accountService';
import { accountActions } from '../slices/accountSlice';
import { Account } from '../../types/account';

function* fetchAccountsSaga() {
    try {
        const accounts: Account[] = yield call(accountService.getAllAccounts);
        yield put(accountActions.fetchAccountsSuccess(accounts));
    } catch (error: any) {
        yield put(
            accountActions.fetchAccountsFailure(
                error.message || 'Failed to fetch accounts',
            ),
        );
    }
}

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
        // Refresh list
        yield put(accountActions.fetchAccountsRequest());
    } catch (error: any) {
        yield put(
            accountActions.createAccountFailure(
                error.message || 'Failed to create account',
            ),
        );
    }
}

function* deleteAccountSaga(action: PayloadAction<string>) {
    try {
        yield call(accountService.deleteAccount, action.payload);
        yield put(accountActions.deleteAccountSuccess());
        // Refresh list
        yield put(accountActions.fetchAccountsRequest());
    } catch (error: any) {
        yield put(
            accountActions.deleteAccountFailure(
                error.message || 'Failed to delete account',
            ),
        );
    }
}

export default function* accountSaga() {
    yield takeLatest(accountActions.fetchAccountsRequest.type, fetchAccountsSaga);
    yield takeLatest(accountActions.createAccountRequest.type, createAccountSaga);
    yield takeLatest(accountActions.deleteAccountRequest.type, deleteAccountSaga);
}
