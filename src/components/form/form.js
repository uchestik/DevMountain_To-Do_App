import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {setTodo, getTodo, saveTodo, flagSave, deleteTodo} from '../../actions/index';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../../utils/styles/formStyles';
import PropTypes from 'prop-types';


const handleDelete = (id, deleteTodo, getTodo, history, flagSaveError) => {
    if(id || typeof (id) === 'number'){
        deleteTodo(id);
        getTodo({}, null, flagSaveError);
        history.push('/');
    }
}

const handleSave = (todo, saveTodo, history, getTodo, flagSaveError) => {
    if(todo.id || typeof (todo.id) === 'number'){
        if(todo.completed){
            saveTodo(todo, todo.id, 'PUT');
        }else{
            //because of API design, save Description before Completed
            saveTodo({...todo, completed : false}, todo.id,  'PATCH'); 
        }
    }else{
        saveTodo(todo, '', 'POST');
    }

    getTodo({}, null, flagSaveError);
    history.push('/');
}

const resetForm = (copy, setTodo, flagSaveError) => {
    setTodo(copy, flagSaveError);
}

const routingHandler = (history, getTodo, flagSaveError) => {
    getTodo({}, null, flagSaveError);
    history.push('/');
}

const handleText = (field, todo, value, setTodo, flagSaveError) => {
    let todoObject = Object.assign({}, todo);
    setTodo({
        ...todoObject,
        [field] : value
    },flagSaveError)
}

const Form = (props) => {
    const {
        todo={}, classes, 
        history, setTodo, todoCopy={}, 
        getTodo, saveTodo, flagSave,
        flagError, deleteTodo
    } = props;
    const {title='', id, description='', completed=false} = todo;

    return (
        <div 
            className='container'
            style={styles.wrapper}
        >
            <div 
                onClick={() => routingHandler(history, getTodo, flagError)}
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
                    onChange={(e) => handleText('title', todo, e.target.value, setTodo, flagError)}
                />
                {
                    (id || typeof (id) === 'number') && 
                    <Button
                        className={classes.forty}
                        onClick = {() => handleText('completed', todo, !completed, setTodo, flagError)}
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
                onChange={(e) => handleText('description', todo, e.target.value, setTodo, flagError)}
            />
            <div style={styles.flex}>
                <Button
                    className={classes.button}
                    color='primary'
                    variant='contained'
                    onClick={() => title ? handleSave(todo, saveTodo, history, getTodo, flagError) : flagSave()}
                >
                    Save
                </Button>
                <Button
                    className={classes.button}
                    variant='contained'
                    onClick={() => (id ||typeof (id) === 'number') ? resetForm(todoCopy, setTodo, flagError) : routingHandler(history, getTodo)}
                >
                    Cancel
                </Button>
                {
                    (id ||typeof (id) === 'number') && 
                    <Button
                        onClick={() => handleDelete(id, deleteTodo, getTodo, history, flagError)}
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

function mapStateToProps (state){
    return{
        todo : state.TODOS.todo,
        todoCopy : state.TODOS.todoCopy,
        flagError : state.TODOS.flagError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setTodo, getTodo, saveTodo, flagSave, deleteTodo}, dispatch)
}

Form.propTypes = {
    todo : PropTypes.object,
    todoCopy : PropTypes.object,
    flagError : PropTypes.bool,
    setTodo : PropTypes.func,
    getTodo : PropTypes.func,
    saveTodo : PropTypes.func,
    flagSave : PropTypes.func,
    deleteTodo : PropTypes.func,
    title : PropTypes.string,
    id : PropTypes.number,
    description : PropTypes.string,
    completed : PropTypes.bool
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(Form)));