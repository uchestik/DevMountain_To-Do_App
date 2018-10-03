import {call, put, takeLatest} from 'redux-saga/effects';
import {SAVE_TODO_CALLER, SAVE_TODO_ERROR, GET_TODOS_SUCCESS} from '../actions/types';

let rootUrl = 'https://practiceapi.devmountain.com/api';

function postFormData(id, method, todo) {
    return fetch(`${rootUrl}/tasks/${id || typeof (id) === 'number' ? id : ''}`,{
        method : method,
        headers:{
            'Content-Type':"application/json"
        },
        body : JSON.stringify(todo)
    })
}

function* saveTodoHandler({todo, id, method, history}){
    try{
        let returnedList = yield call(postFormData, id, method, todo);
        if(history){
            history.push('/');
        }else{
            yield put({type : GET_TODOS_SUCCESS, payload : returnedList.json()})
        }
    }catch(e){
        if(e){
            yield put({type : SAVE_TODO_ERROR, payload : true});
        }
    }
}

export function* saveTodoWatcher(){
    yield takeLatest(SAVE_TODO_CALLER, saveTodoHandler);
}