import React from 'react'


class Login extends React.Component {


    render(){
        return(
            <div>
                <div>
                    Login
                </div>
                <form className='Login-form' onSubmit={this.props.handleSubmit}>
                    <label> Username:
                        <input type='text' name='username' 
                        value = {this.props.form.username || ""}
                        onChange={this.props.handleChange}/>
                    </label>
                    <label> Password:
                        <input type='password' name='password' 
                        value = {this.props.form.password || ""}
                        onChange={this.props.handleChange}/>
                    </label>
                    <button className='login-submit-btn' type='submit'>Login</button>
                        Not registerd?  
                        {/* render Register Component? */}
                    <button className='login-submit-btn' >Sign up</button>    
                    
                </form>
            </div>
        )
    }
}

export default Login;