import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllTodos} from '../../actions';
import TodoHeader from './todoHeader';
import TodoList from './todoList';
import PropTypes from 'prop-types';

class Todo extends Component{

    componentDidMount(){
        this.props.getAllTodos()
    }

    render(){
        return (
            <div className='container'>
                <TodoHeader />
                <TodoList />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getAllTodos}, dispatch);
}

Todo.propTypes = {
    getAllTodos : PropTypes.func
}

export default connect(null, mapDispatchToProps)(Todo)