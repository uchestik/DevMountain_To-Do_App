import {call, put, takeLatest} from 'redux-saga/effects';
import {DELETE_TODO_TASK, DELETE_ERROR, GET_TODOS_SUCCESS} from '../actions/types';

let rootUrl = 'https://practiceapi.devmountain.com/api';

function deleteRequest(id){
    return fetch(`${rootUrl}/tasks/${id}`, {
        method : 'DELETE',
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        } 
    })
}

function* deleteTodoTask({id, history}){
    try{
        let returnedList = yield call(deleteRequest, id);
        yield put({type : DELETE_ERROR, payload : false});
        if(history){
            history.push('/');
        }else{
            yield put({type : GET_TODOS_SUCCESS, payload : returnedList.json()})
        }
    }catch(e){
        if(e){
            yield put({type : DELETE_ERROR, payload : true});
        }
    }
}

export function* deleteTodoTaskWatcher(){
    yield takeLatest(DELETE_TODO_TASK, deleteTodoTask);
}