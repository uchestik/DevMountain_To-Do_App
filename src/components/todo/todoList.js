import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {deleteTodo, removeDeleteFlag, saveTodo} from '../../actions/index';
import styles from '../../utils/styles/todoListStyles';
import PropTypes from 'prop-types';


const handleTodoClick = (history, deleteError, id) => {
    if(deleteError){
        this.props.removeDeleteFlag();
    }
    history.push(`/form/task/${id}`);
}

const handleDelete = (id, deleteTodo) => {
    deleteTodo(id);
}

const handleCompleteUpdate = (todo, saveTodo) => {
    let method = todo.completed ? 'PATCH' : 'PUT';
    saveTodo({...todo, completed : !todo.completed}, todo.id, method);
}

const renderList = (todoList, classes, history, deleteTodo, deleteError, saveTodo) => {
    return todoList.map((todo, index) => {
        return (
            <Card className={classes.card} key={index}>
                <CardContent className={classes.cardContentWrapper}>
                        <div 
                            style={styles.flex}
                            onClick={() => handleTodoClick(history, deleteError, todo.id)}
                        >
                            <Typography>
                                <span 
                                    style={{
                                        textDecoration : todo.completed ? 'line-through' : 'none',
                                        display : 'block'
                                    }}
                                >
                                    {todo.title}
                                </span>
                                <span
                                    style={{
                                        textDecoration : todo.completed ? 'line-through' : 'none',
                                        display : 'block'
                                    }}
                                >
                                    {todo.description}
                                </span>
                            </Typography>
                        </div>
                        <Button
                            onClick={() => handleCompleteUpdate(todo, saveTodo)}
                            variant='contained'
                            >
                                {
                                    todo.completed ?
                                    'Completed'
                                    :
                                    'Complete'
                                }
                        </Button>
                        <CardActions className={classes.cardButtons}>
                            <Icon onClick={() => handleDelete(todo.id, deleteTodo)}>
                                close
                            </Icon>
                        </CardActions>
                </CardContent>
            </Card>
        )
    })
}

const TodoList = (props) => {
    const {
        todoList, todosError, classes, 
        history, deleteError, deleteTodo,
        saveError, saveTodo
    } = props;
    return (
        <React.Fragment>
            {
                todosError && 
                <div 
                    className='alert alert-danger'
                    style={styles.position}
                    role='alert'
                >
                    Error has occured
                </div>
            }
            {
                todoList && !todosError &&
                <div style={styles.position}>
                    {
                        deleteError && 
                        <div className='alert alert-danger' role='alert'>
                            Error occured. Task was not deleted.
                        </div>
                    }
                    {
                        saveError && 
                        <div className='alert alert-danger' role='alert'>
                            Error occured. Task was not saved.
                        </div>
                    }
                    {renderList(todoList, classes, history, deleteTodo, deleteError, saveTodo)}
                </div>
            }
        </React.Fragment>
    )
}

function mapStateToProps(state){
    return{
        todosLoading : state.TODOS.todosLoading,
        todoList : state.TODOS.todoList,
        todosError : state.TODOS.todosError,
        deleteError : state.TODOS.deleteError,
        saveError : state.TODOS.saveError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({deleteTodo, removeDeleteFlag, saveTodo}, dispatch)
}

TodoList.propTypes = {
    todosLoading : PropTypes.bool,
    todoList : PropTypes.array,
    todosError : PropTypes.bool,
    deleteError : PropTypes.bool,
    saveError : PropTypes.bool,
    deleteTodo : PropTypes.func,
    history : PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(TodoList)));