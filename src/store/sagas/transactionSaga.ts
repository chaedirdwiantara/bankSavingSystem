import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as transactionService from '../../services/transactionService';
import { transactionActions } from '../slices/transactionSlice';
import { Transaction } from '../../types/transaction';

function* fetchTransactionsSaga(action: PayloadAction<string>) {
    try {
        const transactions: Transaction[] = yield call(
            transactionService.getTransactionsByAccount,
            action.payload,
        );
        yield put(transactionActions.fetchTransactionsSuccess(transactions));
    } catch (error: any) {
        yield put(
            transactionActions.fetchTransactionsFailure(
                error.message || 'Failed to fetch transactions',
            ),
        );
    }
}

function* createDepositSaga(
    action: PayloadAction<{ accountId: string; amount: number; depositDate: Date }>,
) {
    try {
        const transaction: Transaction = yield call(
            transactionService.createDeposit,
            action.payload,
        );
        yield put(transactionActions.createDepositSuccess(transaction));
        // Refresh list
        yield put(
            transactionActions.fetchTransactionsRequest(action.payload.accountId),
        );
    } catch (error: any) {
        yield put(
            transactionActions.createDepositFailure(
                error.message || 'Failed to create deposit',
            ),
        );
    }
}

function* createWithdrawalSaga(
    action: PayloadAction<{
        accountId: string;
        amount: number;
        withdrawalDate: Date;
    }>,
) {
    try {
        const transaction: Transaction = yield call(
            transactionService.createWithdrawal,
            action.payload,
        );
        yield put(transactionActions.createWithdrawalSuccess(transaction));
        // Refresh list
        yield put(
            transactionActions.fetchTransactionsRequest(action.payload.accountId),
        );
    } catch (error: any) {
        yield put(
            transactionActions.createWithdrawalFailure(
                error.message || 'Failed to create withdrawal',
            ),
        );
    }
}

export default function* transactionSaga() {
    yield takeLatest(
        transactionActions.fetchTransactionsRequest.type,
        fetchTransactionsSaga,
    );
    yield takeLatest(
        transactionActions.createDepositRequest.type,
        createDepositSaga,
    );
    yield takeLatest(
        transactionActions.createWithdrawalRequest.type,
        createWithdrawalSaga,
    );
}
