import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem delTodo={ this.props.delTodo } key={ todo._id } todo={todo} markCompleted={ this.props.markCompleted } />
        ))
    }
}

//PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markCompleted: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

export default Todos;
