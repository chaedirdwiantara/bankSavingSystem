import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as depositoService from '../../services/depositoTypeService';
import { depositoActions } from '../slices/depositoSlice';
import { DepositoType } from '../../types/deposito';

function* fetchDepositoTypesSaga() {
    try {
        const depositoTypes: DepositoType[] = yield call(
            depositoService.getAllDepositoTypes,
        );
        yield put(depositoActions.fetchDepositoTypesSuccess(depositoTypes));
    } catch (error: any) {
        yield put(
            depositoActions.fetchDepositoTypesFailure(
                error.message || 'Failed to fetch deposito types',
            ),
        );
    }
}

function* createDepositoTypeSaga(
    action: PayloadAction<{ name: string; yearlyReturn: number }>,
) {
    try {
        const newDepositoType: DepositoType = yield call(
            depositoService.createDepositoType,
            action.payload,
        );
        yield put(depositoActions.createDepositoTypeSuccess(newDepositoType));
        // Refresh list
        yield put(depositoActions.fetchDepositoTypesRequest());
    } catch (error: any) {
        yield put(
            depositoActions.createDepositoTypeFailure(
                error.message || 'Failed to create deposito type',
            ),
        );
    }
}

function* updateDepositoTypeSaga(
    action: PayloadAction<{ id: string; name: string; yearlyReturn: number }>,
) {
    try {
        const updatedDepositoType: DepositoType = yield call(
            depositoService.updateDepositoType,
            action.payload.id,
            {
                name: action.payload.name,
                yearlyReturn: action.payload.yearlyReturn,
            },
        );
        yield put(depositoActions.updateDepositoTypeSuccess(updatedDepositoType));
        // Refresh list
        yield put(depositoActions.fetchDepositoTypesRequest());
    } catch (error: any) {
        yield put(
            depositoActions.updateDepositoTypeFailure(
                error.message || 'Failed to update deposito type',
            ),
        );
    }
}

function* deleteDepositoTypeSaga(action: PayloadAction<string>) {
    try {
        yield call(depositoService.deleteDepositoType, action.payload);
        yield put(depositoActions.deleteDepositoTypeSuccess());
        // Refresh list
        yield put(depositoActions.fetchDepositoTypesRequest());
    } catch (error: any) {
        yield put(
            depositoActions.deleteDepositoTypeFailure(
                error.message || 'Failed to delete deposito type',
            ),
        );
    }
}

export default function* depositoSaga() {
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
