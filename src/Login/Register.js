import React from 'react'


class Register extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        userName: "",
        image: "",
        password: ""
    }

    onChangeState = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleRegisterUser = (event) => {
        event.preventDefault()
        const obj = {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          username: this.state.userName,
          image: this.state.image,
          password: this.state.password
        }
    
        fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {"Content-Type": "application/json", "Accept": "Application/json"},
          body: JSON.stringify(obj)
            })
          .then(resp => resp.json())
          .then(data => {
            localStorage.setItem("token", data.token)
            this.props.login(data.user)
          })
        }

    render() {
        return (
            <div className='Register'>
                <div>
                    Register
                </div>
                <form className='Login-form' onSubmit={this.handleRegisterUser}>
                    <label> First Name: 
                        <input type='text' name='first_name' 
                        id = "firstName"
                        placeholder = "Enter first name"
                        onChange={this.onChangeState}/>
                    </label>
                    <label> Last Name: 
                        <input type='text' name='last_name' 
                        id = "lastName"
                        placeholder = "Enter last name"
                        // value={ this.props.form.last_name || "" } 
                        onChange={this.onChangeState}/>
                    </label>
                    <label> User Name:
                        <input type='text' name='username' 
                        id = "userName"
                        placeholder = "Enter username"
                        // value={ this.props.form.username || "" } 
                        onChange={this.onChangeState}/>
                    </label>
                    <label> Image:
                        <input type='text' name='image' 
                        id = "image"
                        placeholder = "Enter image URL"
                        // value={ this.props.form.password || "" } 
                        onChange={this.onChangeState}/>
                    </label>
                    <label> Password:
                        <input type='password' name='password' 
                        placeholder = "Enter password"
                        id = "password"
                        // value={ this.props.form.password || "" } 
                        onChange={this.onChangeState}/>
                    </label>
                    <button className='login-submit-btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;

// function Register(){
//     const [firstName, setFirstName] = useState("")
//     const [lastName, setLastName] = useState("")
//     const [user_name, setUserName] = useState("")
//     const [image, setImage] = useState("")


//     function handleRegisterUser() {
//         const obj = {
//           first_name: "",
//           last_name: "",
//           user_name: "",
//           image: "",
//           password: ""
//         }
    
//         fetch("http://localhost:3001/user", {
//           method: "POST",
//           headers: {"Content-Type": "application/json", "Accept": "Application/json"},
//           body: JSON.stringify(obj)
//           .then(resp => resp.json())
//           // .then(data => )
//         })
//       }


//     return (
//         <div className='Register'>
//                         <div>
//                              Register
//                        </div>
//                          <form className='Login-form' onSubmit={this.props.handleSubmit}>
//                              <label> First Name: 
//                                  <input type='text' name='first_name' 
//                                 value={firstName} 
//                                 />
//                             </label>
//                             <label> Last Name: 
//                                 <input type='text' name='last_name' 
//                                 value={ this.props.form.last_name || "" } 
//                                 onChange={this.props.handleChange}/>
//                             </label>
//                             <label> User Name:
//                                 <input type='text' name='username' 
//                                 value={ this.props.form.username || "" } 
//                                 onChange={this.props.handleChange}/>
//                             </label>
//                             <label> Password:
//                                 <input type='password' name='password' 
//                                 value={ this.props.form.password || "" } 
//                                 onChange={this.props.handleChange}/>
//                             </label>
//                             <button className='login-submit-btn' type='submit'>Submit</button>
//                         </form>
//                     </div>
//     )

// }

// export default Register