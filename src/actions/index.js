//The api is very repetitive and interconnected.
//For this app I try to get the most dispatches out of few functions

import fetch from 'isomorphic-fetch'
import {
    GET_TODOS_SUCCESS, 
    GET_TODOS_LOADING, 
    GET_TODOS_ERROR,
    GET_TODO,
    SET_TODO,
    GET_TODO_COPY,
    FLAG_SAVE,
    SAVE_TODO_ERROR,
    SAVE_TODO_LOADING,
    DELETE_ERROR,
    DELETE_TODO_LIST
} from './types';

let rootUrl = 'https://practiceapi.devmountain.com/api/'

export const getAllTodos = () => dispatch => {
    dispatch({type : GET_TODOS_LOADING, payload : true});
    
    return fetch(`${rootUrl}/tasks`, {method : 'GET'})
    .then(res => {
        if(res.status === 200){
            dispatch({type : GET_TODOS_SUCCESS, payload : res.json()});
        }
    })
    .catch(err => {
        if(err){
            dispatch({type : GET_TODOS_ERROR, payload : true});
        }
    })
}

export const getTodo = (todo, deleteError, flagSaveError) => dispatch => {
    if(flagSaveError){
        dispatch({type : FLAG_SAVE, payload : false});
    };
    if(deleteError){
        dispatch({type : DELETE_ERROR, payload : false});
    };

    dispatch({type : GET_TODO, payload : todo});
    dispatch({type : GET_TODO_COPY, payload : todo});
}

export const setTodo = (todo, flagSaveError) => dispatch => {
    if(flagSaveError){
        dispatch({type : FLAG_SAVE, payload : false});
    }
    dispatch({type : SET_TODO, payload : todo});
}

export const saveTodo = (todo, id, method) => dispatch => {
    dispatch({type : SAVE_TODO_LOADING, payload : true});
    return fetch(`${rootUrl}/tasks${id || typeof (id) === 'number' ? `/${id}` : ''}`,{
        method : method,
        headers:{
            'Content-Type':"application/json"
        },
        body : JSON.stringify(todo)
    })
    .then(res => {
        if(res.status === 200){
            dispatch({type : GET_TODOS_SUCCESS, payload : res.json()});
            dispatch({type : FLAG_SAVE, payload : false});
            dispatch({type : SAVE_TODO_ERROR, payload : false});
        }
    })
    .catch(err => {
        if(err){
            dispatch({type : SAVE_TODO_ERROR, payload : true})
        }
    })
}

export const deleteTodo = (id) => dispatch => {
    return fetch(`${rootUrl}/tasks/${id}`, {
        method : 'DELETE',
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        } 
    })
    .then(res => {
        if(res.status === 200){
            dispatch({type : GET_TODOS_SUCCESS, payload : res.json()});
            dispatch({type : DELETE_ERROR, payload : false});
        }
    })
    .catch(err => {
        if(err){
            dispatch({type : DELETE_ERROR, payload : true})
        }
    })
}

export const flagSave = () => dispatch => {
    dispatch({type : FLAG_SAVE, payload : true})
}

export const deleteTodoList = () => dispatch => {
    dispatch({type : DELETE_TODO_LIST, payload : []})
}