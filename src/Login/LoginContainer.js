import React from 'react'

import Register from './Register'
import Login from './Login'

import './LoginContainer.css'

class LoginContainer extends React.Component {

    constructor(){
        super()
        this.state ={
            form: {},
            showingRegister: false,
        }
    }

    toggleForm = () => {
        this.setState({showingRegister: !this.state.showingRegister})
    }

    handleChange = (e) => {
        let formObj = this.state.form
        formObj[e.target.name] = e.target.value
        this.setState({form: formObj})
    }

    handleSubmit = (e) => {
        
        e.preventDefault()
        fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.form.first_name,
                last_name: this.state.form.last_name,
                username: this.state.form.username,
                password: this.state.form.password,
            })
        })
        .then(r => r.json())
        .then(data => {
           
            this.setState({form: {}})
            if (data.token) {
                localStorage.setItem('token', data.token)
                this.props.setUser(data)
                return data.status
            }
            return console.log(data)
        })
    }

    handleLoginSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.form.username,
                password: this.state.form.password,
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({form: {}})
            // ok thanks for the data, what is this data, part of it is the token. 
            // store the token locally on the user's (customer/client) browser
            if (data.token) {
                localStorage.setItem('token', data.token)
                this.props.setUser(data)
                return data.status
            }
            return console.log(data)
        })
    }



    render() {
        return(
            <div className='LoginContainer'>
                    <div className='login-toggle-bar'>
                        <div className='login-tab' onClick={this.toggleForm}>Register</div>
                        <div className='login-tab' onClick={this.toggleForm}>Login</div>
                    </div>
            
                { this.state.showingRegister ? < Register handleChange={this.handleChange} 
                            handleSubmit={this.handleSubmit}
                            form={this.state.form}/> 
                        : < Login handleChange={this.handleChange} 
                            handleSubmit={this.handleLoginSubmit}
                            form={this.state.form}/> }

            </div>
        )

    }
}

export default LoginContainer;