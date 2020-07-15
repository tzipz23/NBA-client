import React from 'react'


class Register extends React.Component {

    render() {
        return (
            <div className='Register'>
                <div>
                    Register
                </div>
                <form className='Login-form' onSubmit={this.props.handleSubmit}>
                    <label> First Name: 
                        <input type='text' name='first_name' 
                        value={ this.props.form.first_name || "" } 
                        onChange={this.props.handleChange}/>
                    </label>
                    <label> Last Name: 
                        <input type='text' name='last_name' 
                        value={ this.props.form.last_name || "" } 
                        onChange={this.props.handleChange}/>
                    </label>
                    <label> User Name:
                        <input type='text' name='username' 
                        value={ this.props.form.username || "" } 
                        onChange={this.props.handleChange}/>
                    </label>
                    <label> Password:
                        <input type='password' name='password' 
                        value={ this.props.form.password || "" } 
                        onChange={this.props.handleChange}/>
                    </label>
                    <button className='login-submit-btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;
