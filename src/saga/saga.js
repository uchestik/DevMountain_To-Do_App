import {takeLatest} from 'redux-saga/effects';
import {GET_TODOS_LOADING, SAVE_TODO_LOADING} from '../actions/types';
import {getAllTodos, saveTodo} from '../actions/index';

export function* watcherSaga() {
    yield takeLatest(GET_TODOS_LOADING, getAllTodos);
    yield takeLatest(SAVE_TODO_LOADING, saveTodo);
}