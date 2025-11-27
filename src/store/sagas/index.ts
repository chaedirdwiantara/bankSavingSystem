import { all, fork } from 'redux-saga/effects';
import customerSaga from './customerSaga';
import accountSaga from './accountSaga';
import depositoSaga from './depositoSaga';
import transactionSaga from './transactionSaga';

export function* rootSaga() {
    yield all([
        fork(customerSaga),
        fork(accountSaga),
        fork(depositoSaga),
        fork(transactionSaga),
    ]);
}
