import {
    GET_TODOS_SUCCESS, 
    GET_TODOS_ERROR, 
    GET_TODOS_LOADING,
    GET_TODO,
    GET_TODO_COPY,
    SET_TODO,
    FLAG_SAVE,
    SAVE_TODO_ERROR,
    SAVE_TODO_LOADING,
    DELETE_ERROR,
    DELETE_TODO_LIST
} from '../actions/types'

export default function (state = {}, action){
    switch (action.type){
        case GET_TODOS_LOADING:
            return {...state, todosLoading : action.payload, todoList : [], todosError : false};
        case GET_TODOS_SUCCESS:
            return {
                ...state, todosLoading : false, 
                todoList : action.payload, todosError : false, 
                saveLoading : false, saveError : false}
                ;
        case GET_TODOS_ERROR:
            return {...state, todosLoading : false, todoList : [], todosError : action.payload};
        case GET_TODO:
            return {...state, todo : action.payload};
        case GET_TODO_COPY:
            return {...state, todoCopy : action.payload};
        case SET_TODO:
            return {...state, todo : action.payload};
        case FLAG_SAVE:
            return {...state, flagError : action.payload};
        case SAVE_TODO_LOADING:
            return {...state, saveLoading : action.payload, saveError : false};
        case SAVE_TODO_ERROR:
            return {...state, saveLoading : false, saveError : action.payload};
        case DELETE_ERROR:
                return {...state, deleteError : action.payload};
        case DELETE_TODO_LIST:
                return {...state, todoList : action.payload};
        default:
            return state;
    }
}