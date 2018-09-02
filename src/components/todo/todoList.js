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
import {getTodo,deleteTodo,deleteTodoList} from '../../actions/index';
import styles from '../../utils/styles/todoListStyles';
import PropTypes from 'prop-types';


const handleTodoClick = (todo, getTodo, history, deleteTodoList, deleteError) => {
    getTodo(todo, deleteError);
    deleteTodoList();
    history.push('/form');
}

const renderList = (todoList, classes, getTodo, history, deleteTodo, deleteTodoList, deleteError) => {
    return todoList.map((todo, index) => {
        return (
            <Card className={classes.card} key={index}>
                <CardContent className={classes.cardContentWrapper}>
                        <div 
                            style={styles.flex}
                            onClick={() => handleTodoClick(todo, getTodo, history, deleteTodoList, deleteError)}
                        >
                            <Typography>
                                <span 
                                    style={{
                                        textDecoration : todo.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    {todo.title}
                                </span>
                            </Typography>
                            <Button
                                    variant='contained'
                                >
                                    {
                                        todo.completed ?
                                        'Completed'
                                        :
                                        'Complete'
                                    }
                            </Button>
                        </div>
                        <CardActions className={classes.cardButtons}>
                            <Icon onClick={() => deleteTodo(todo.id)}>
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
        todoList, todosError, 
        todosLoading, classes, getTodo, 
        history, deleteError, deleteTodo,
        deleteTodoList, saveError
    } = props;
    return (
        <React.Fragment>
            {
                todosLoading && 
                <div style={styles.position}>
                    Loading ....
                </div>
            }
            {
                !todosLoading && todosError && 
                <div 
                    className='alert alert-danger'
                    style={styles.position}
                    role='alert'
                >
                    Error has occured
                </div>
            }
            {
                !todosLoading && todoList &&
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
                    {renderList(todoList, classes, getTodo, history, deleteTodo, deleteTodoList, deleteError)}
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
    return bindActionCreators({getTodo,deleteTodo,deleteTodoList}, dispatch)
}

TodoList.propTypes = {
    todosLoading : PropTypes.bool,
    todoList : PropTypes.array,
    todosError : PropTypes.bool,
    deleteError : PropTypes.bool,
    saveError : PropTypes.bool,
    getTodo : PropTypes.func,
    deleteTodo : PropTypes.func,
    deleteTodoList : PropTypes.func,
    history : PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(TodoList)));