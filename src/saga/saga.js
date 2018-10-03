import {all} from 'redux-saga/effects';
import {getTodosWatcher} from './getTodoSaga';
import {saveTodoWatcher} from './saveTodoSaga';
import {deleteTodoTaskWatcher} from './deleteTodoSaga';

export function* rootSaga() {
    yield all(
        [
            getTodosWatcher(),
            deleteTodoTaskWatcher(),
            saveTodoWatcher()
        ]
    )
}