import {
    REMOVE_DELETE_FLAG,
    DELETE_TODO_TASK,
    CLEAR_FORM_ERROR_FLAGS,
    CLEAR_TODO_AND_COPY,
    SAVE_TODO_CALLER,
    GET_TODO_WITH_ID,
    GET_TODOS_REQUEST,
    SET_TODO,
    GET_TODO_COPY,
    FLAG_SAVE
} from './types';

export function getAllTodos(){
    return {type : GET_TODOS_REQUEST};
}

export function getTaskWithId(id){
    return {type : GET_TODO_WITH_ID, payload : id}
}

export function clearTodoAndCopy(todo){
    return {type : CLEAR_TODO_AND_COPY, payload : todo};
}

export function setTodoCopy(){
    return {type : GET_TODO_COPY, payload : {}}
}

export function clearFormErrorFlags(){
    return {type : CLEAR_FORM_ERROR_FLAGS, payload : false}
}

export const setTodo = (todo) => {
    return {type : SET_TODO, payload : todo};
}

export const saveTodo = (todo, id, method, history) => {
    return {type : SAVE_TODO_CALLER, todo, id, method, history}
}

export const flagSave = () => dispatch => {
    dispatch({type : FLAG_SAVE, payload : true})
}

export const deleteTodo = (id, history) => {
    return {type : DELETE_TODO_TASK, id, history};
}

export const removeDeleteFlag = () => {
    return {type : REMOVE_DELETE_FLAG, payload : false}
}

