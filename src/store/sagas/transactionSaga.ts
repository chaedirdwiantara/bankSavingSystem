transactionService.getTransactionsByAccount,
    action.payload,
        );
yield put(transactionActions.fetchTransactionsSuccess(transactions));
    } catch (error: any) {
    yield put(transactionActions.fetchTransactionsFailure(error.message));
}
}

// Worker Saga: create deposit
function* createDepositSaga(
    action: PayloadAction<{
        accountId: string;
        amount: number;
        depositDate: Date;
    }>,
) {
    try {
        const transaction: Transaction = yield call(
            transactionService.createDeposit,
            action.payload,
        );
        yield put(transactionActions.createDepositSuccess(transaction));

        // Update account balance in Redux
        yield put(
            accountActions.updateAccountBalance({
                id: action.payload.accountId,
                balance: transaction.balanceAfter,
            }),
        );
    } catch (error: any) {
        yield put(transactionActions.createDepositFailure(error.message));
    }
}

// Worker Saga: create withdrawal
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

        // Update account balance in Redux
        yield put(
            accountActions.updateAccountBalance({
                id: action.payload.accountId,
                balance: transaction.balanceAfter,
            }),
        );
    } catch (error: any) {
        yield put(transactionActions.createWithdrawalFailure(error.message));
    }
}

// Watcher Saga
export function* transactionSaga() {
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
