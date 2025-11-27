        );
yield put(depositoActions.fetchDepositoTypesSuccess(depositoTypes));
    } catch (error: any) {
    yield put(depositoActions.fetchDepositoTypesFailure(error.message));
}
}

// Worker Saga: create deposito type
function* createDepositoTypeSaga(
    action: PayloadAction<{ name: string; yearlyReturn: number }>,
) {
    try {
        const newDepositoType: DepositoType = yield call(
            depositoService.createDepositoType,
            action.payload,
        );
        yield put(depositoActions.createDepositoTypeSuccess(newDepositoType));
    } catch (error: any) {
        yield put(depositoActions.createDepositoTypeFailure(error.message));
    }
}

// Worker Saga: update deposito type
function* updateDepositoTypeSaga(
    action: PayloadAction<{ id: string; name: string; yearlyReturn: number }>,
) {
    try {
        const updatedDepositoType: DepositoType = yield call(
            depositoService.updateDepositoType,
            action.payload.id,
            { name: action.payload.name, yearlyReturn: action.payload.yearlyReturn },
        );
        yield put(depositoActions.updateDepositoTypeSuccess(updatedDepositoType));
    } catch (error: any) {
        yield put(depositoActions.updateDepositoTypeFailure(error.message));
    }
}

// Worker Saga: delete deposito type
function* deleteDepositoTypeSaga(action: PayloadAction<string>) {
    try {
        yield call(depositoService.deleteDepositoType, action.payload);
        yield put(depositoActions.deleteDepositoTypeSuccess(action.payload));
    } catch (error: any) {
        yield put(depositoActions.deleteDepositoTypeFailure(error.message));
    }
}

// Watcher Saga
export function* depositoSaga() {
    yield takeLatest(
        depositoActions.fetchDepositoTypesRequest.type,
        fetchDepositoTypesSaga,
    );
    yield takeLatest(
        depositoActions.createDepositoTypeRequest.type,
        createDepositoTypeSaga,
    );
    yield takeLatest(
        depositoActions.updateDepositoTypeRequest.type,
        updateDepositoTypeSaga,
    );
    yield takeLatest(
        depositoActions.deleteDepositoTypeRequest.type,
        deleteDepositoTypeSaga,
    );
}
