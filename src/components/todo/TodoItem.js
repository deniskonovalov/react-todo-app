import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {

    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through':'none'
        }   
    }


    render() {
        const {_id, title} = this.props.todo
        return (
        <div style={this.getStyle()}>
            <p>
                <input type="checkbox" onChange={this.props.markCompleted.bind(this, _id)} />
                { title }
                <button onClick={this.props.delTodo.bind(this, _id)} style={btnStyle}>X</button>
            </p>
        </div>
        )
    }
}

//PropTypes
TodoItem.propTypes = {
    // todos: PropTypes.array.isRequired,
    markCompleted: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    float: 'right'
}

export default TodoItem
