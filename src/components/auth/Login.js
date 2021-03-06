import React, { Component } from 'react';
import axios from 'axios'
import config from '../../configs/config'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        axios.post(`${config.url}/users/login`, JSON.stringify(this.state), {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status === 200) {
                this.props.history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
              console.error(err);
            alert('Error logging in please try again');
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Hello, please login</h1>

                <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required/>

                <input type="submit" value="Submit"/>
            </form>
        )
    }
}
