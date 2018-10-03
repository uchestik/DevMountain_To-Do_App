import {call, put, takeLatest} from 'redux-saga/effects';
import {
    GET_TODOS_SUCCESS, 
    GET_TODOS_ERROR,
    GET_TODOS_REQUEST
} from '../actions/types'

let rootUrl = 'https://practiceapi.devmountain.com/api';

function fetchApi(){
    return fetch(`${rootUrl}/tasks`, {method : 'GET'})
}

function* callGetTodoList(){
    try{
        let todoList = yield call(fetchApi)
        yield put({type : GET_TODOS_SUCCESS, payload : todoList.json()});
    }catch(err){
        yield put({type : GET_TODOS_ERROR, payload : true});
    }
}

export function* getTodosWatcher(){
    yield takeLatest(GET_TODOS_REQUEST, callGetTodoList);
}