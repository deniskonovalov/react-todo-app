import React, { Component } from 'react';
import Todos from './components/todo/Todos'
import AddTodo from './components/todo/AddTodo'
import Header from './components/layout/Header'
import About from './components/pages/About'
import config from './configs/config'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css';

class App extends Component {

    state = {
        todos: []
    };

    componentDidMount() {
        axios.get(`${config.url}/tasks`).then((res) => {
            this.setState({
                todos: res.data
            })
        })
    }



    markCompleted = (id) => {
        axios.put(`${config.url}/task/edit/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then( res => {
            this.setState({ todos: this.state.todos.map(todo => {
                    if(todo._id === res.data._id) {
                        todo.completed = !todo.completed
                    }
                    return todo;
                }) 
            })
        })
    }

    delTodo = (id) => {
        axios.delete(`${config.url}/task/delete/${id}`).then( (res) => {
            this.setState({todos: [...this.state.todos.filter( todo => todo._id !== res.data._id)]})
        })
    }

    addTodo = (title) => {
        const newTodo = {
            title,
            completed: false
        }
        
        axios.post(`${config.url}/task`,newTodo).then((res) => {
            this.setState({ todos: [...this.state.todos, res.data]})
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={ props => (
                            <React.Fragment>
                                <AddTodo addTodo={ this.addTodo } /> 
                                <Todos todos={this.state.todos} delTodo={this.delTodo} markCompleted={this.markCompleted} />
                            </React.Fragment>
                        )}/>
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
