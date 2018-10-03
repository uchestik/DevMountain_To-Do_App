import {
    REMOVE_DELETE_FLAG,
    CLEAR_FORM_ERROR_FLAGS,
    CLEAR_TODO_AND_COPY,
    GET_TODO_WITH_ID,
    GET_TODOS_SUCCESS, 
    GET_TODOS_ERROR, 
    GET_TODO,
    GET_TODO_COPY,
    SET_TODO,
    FLAG_SAVE,
    SAVE_TODO_ERROR,
    DELETE_ERROR,
} from '../actions/types'

export default function (state = {}, action){
    switch (action.type){
        case GET_TODOS_SUCCESS:
            return {
                ...state, 
                todoList : action.payload, todosError : false, 
                saveLoading : false, saveError : false}
                ;
        case GET_TODOS_ERROR:
            return {...state, todoList : [], todosError : action.payload};
        case GET_TODO:
            return {...state, todo : action.payload};
        case GET_TODO_WITH_ID:
                return{
                    ...state, 
                    todoCopy : state.todoList && state.todoList.filter(task => {
                        return task.id === action.payload
                    })[0],
                    todo : state.todoList && state.todoList.filter(task => {
                        return task.id === action.payload
                    })[0]
            }
        case GET_TODO_COPY:
            return {...state, todoCopy : action.payload};
        case SET_TODO:
            return {...state, todo : action.payload};
        case CLEAR_TODO_AND_COPY:
            return {
                ...state, 
                todo : action.payload, 
                todoCopy : action.payload
            };
        case FLAG_SAVE:
            return {...state, flagError : action.payload};
        case CLEAR_FORM_ERROR_FLAGS:
            return {...state, flagError : action.payload};
        case SAVE_TODO_ERROR:
            return {...state, saveLoading : false, saveError : action.payload};
        case DELETE_ERROR:
            return {...state, deleteError : action.payload};
        case REMOVE_DELETE_FLAG:
            return {...state, deleteError : action.payload}
        default:
            return state;
    }
}