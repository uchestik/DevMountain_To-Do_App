import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {
    setTodo, 
    saveTodo, flagSave, 
    deleteTodo, getTaskWithId, 
    getAllTodos, clearTodoAndCopy,
    clearFormErrorFlags
} from '../../actions/index';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../../utils/styles/formStyles';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Form extends Component{

    componentDidMount(){
        const {
            match, getAllTodos, getTaskWithId, todoList
        } = this.props;
        if(typeof Number(match.params.id) === 'number'){
            if((!todoList || todoList.length === 0) && Number(match.params.id) ){
                getAllTodos();
            }else{
                getTaskWithId(Number(match.params.id));
            }
        }
    }

    componentDidUpdate(prevProps){
        const {
            todoList, match, 
            getTaskWithId
        } = this.props;

        if(todoList && !(_.isEqual(todoList, prevProps.todoList))){
            if(Number(match.params.id)){
                getTaskWithId(Number(match.params.id));
            }
        }
    }

    handleDelete = (id, deleteTodo, clearTodoAndCopy, history, flagSaveError) => {
        if(id || typeof (id) === 'number'){
            deleteTodo(id, history);
            clearTodoAndCopy();
            if(flagSaveError){
                this.props.clearFormErrorFlags();
            }
        }
    }
    
    handleSave = (todo, saveTodo, history, clearTodoAndCopy, flagSaveError) => {
        if(flagSaveError){
            this.props.clearFormErrorFlags();
        }
        
        if(todo.id || typeof (todo.id) === 'number'){
            if(todo.completed){
                saveTodo(todo, todo.id, 'PUT', history);
            }else{
                //because of API design, save Description before Completed
                saveTodo(todo, todo.id,  'PATCH', history); 
            }
        }else{
            saveTodo(todo, '', 'POST', history);
        }

        clearTodoAndCopy();
    }
    
    resetForm = (copy, setTodo, flagSaveError) => {
        if(flagSaveError){
            this.props.clearFormErrorFlags();
        }
        setTodo(copy);
    }
    
    routingHandler = (history, clearTodoAndCopy, clearFormErrorFlags) => {
        clearFormErrorFlags();
        clearTodoAndCopy();
        history.push('/');
    }
    
    handleText = (field, todo, value, setTodo, flagSaveError) => {
        let todoObject = Object.assign({}, todo);
        if(flagSaveError){
            this.props.clearFormErrorFlags();
        }
        setTodo({
            ...todoObject,
            [field] : value
        })
    }

    render(){
        const {
            todo={}, classes, 
            history, setTodo, todoCopy={}, 
            saveTodo, flagSave,
            flagError, deleteTodo, 
            clearTodoAndCopy, clearFormErrorFlags
        } = this.props;
        const {title='', id, description='', completed=false} = todo;
        return (
            <div 
                className='container'
                style={styles.wrapper}
            >
                <div 
                    onClick={() => this.routingHandler(history, clearTodoAndCopy, clearFormErrorFlags)}
                    style={styles.link}
                >
                    {`< Back to Tasks`}
                </div>
                {
                    !title && flagError &&
                    <div className='alert alert-danger' role='alert'>
                        Title Required
                    </div>
                }
                <div style={styles.flex}>
                    <TextField 
                        className={(id || typeof (id) === 'number') ? classes.sixty : classes.fullWidth}
                        label='Task'
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => this.handleText('title', todo, e.target.value, setTodo, flagError)}
                    />
                    {
                        (id || typeof (id) === 'number') && 
                        <Button
                            className={classes.forty}
                            onClick = {() => this.handleText('completed', todo, !completed, setTodo, flagError)}
                            variant='contained'
                        >
                            {
                                completed ?
                                'Completed'
                                :
                                'Complete'
                            }
                        </Button>
                    }
                </div>
                <TextField 
                    className={classes.fullWidth}
                    label='Description'
                    id='description'
                    name='description'
                    multiline
                    value={description}
                    onChange={(e) => this.handleText('description', todo, e.target.value, setTodo, flagError)}
                />
                <div style={styles.flex}>
                    <Button
                        className={classes.button}
                        color='primary'
                        variant='contained'
                        onClick={() => title ? this.handleSave(todo, saveTodo, history, clearTodoAndCopy, flagError) : flagSave()}
                    >
                        Save
                    </Button>
                    <Button
                        className={classes.button}
                        variant='contained'
                        onClick={() => (id ||typeof (id) === 'number') ? this.resetForm(todoCopy, setTodo, flagError) : this.routingHandler(history, clearTodoAndCopy, clearFormErrorFlags)}
                    >
                        Cancel
                    </Button>
                    {
                        (id ||typeof (id) === 'number') && 
                        <Button
                            onClick={() => this.handleDelete(id, deleteTodo, clearTodoAndCopy, history, flagError)}
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                        >
                            Delete
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state){
    return{
        todoList : state.TODOS.todoList,
        todo : state.TODOS.todo,
        todoCopy : state.TODOS.todoCopy,
        flagError : state.TODOS.flagError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setTodo, 
        saveTodo, flagSave, 
        deleteTodo, getTaskWithId, 
        getAllTodos, clearTodoAndCopy,
        clearFormErrorFlags
    }, dispatch)
}

Form.propTypes = {
    todo : PropTypes.object,
    todoCopy : PropTypes.object,
    flagError : PropTypes.bool,
    setTodo : PropTypes.func,
    saveTodo : PropTypes.func,
    flagSave : PropTypes.func,
    deleteTodo : PropTypes.func,
    title : PropTypes.string,
    id : PropTypes.number,
    description : PropTypes.string,
    completed : PropTypes.bool
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(Form)));