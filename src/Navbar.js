import React from 'react'
import {Link} from 'react-router-dom'
import {Search, Grid} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


// import logo from './images/JobTestr.png'
import logo from './images/medialogo.png'

import './Navbar.css'

class Navbar extends React.Component {
    state = {
        users: [],
        filteredUser: [],
        search: ""
    }

    logout = () => {
        console.log('logging out')
        localStorage.removeItem('token')
        this.props.removeUser()
    }

    componentDidMount(){
        fetch("http://localhost:3001/user")
        .then(resp => resp.json())
        .then(data => this.setState({users: data}))
    }


    onSearchChange = (event) => {
        let filter = this.state.users.filter(user => user.first_name.includes(this.state.search))
        let names = filter.map(user => ({
            title: user.first_name,
            // title: user.user_name,
            image: user.image
        }))
        // debugger
    
        this.setState({ filteredUser: names})
        this.setState({ search: event.target.value })
    }

    handleResultSelect = (event) => {
        let filteredUser = this.state.users.find((user) => user.first_name === event.target.innerText)
        // debugger
        this.props.history.location.pathname = "/"         
        this.props.history.push(`user/${filteredUser.id}`)
    }

    render(){
        return(
            <div className ='Navbar'>
                <div className='Navbar-logo'>
                <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>                </div>
                <ul className='Navbar-menu'>
                <Grid.Column>
                    <Search style={{zIndex: "1"}} placeholder='search users' results={this.state.filteredUser} onSearchChange={this.onSearchChange} onResultSelect={this.handleResultSelect}/>
                </Grid.Column>
                
                <li className='Navbar-menu-item'><Link to='/articles'>Media</Link></li>
                    <li className='Navbar-menu-item'><Link to='/team'>Teams</Link></li>
                    <li className='Navbar-menu-item'><Link to='/profile'>Profile</Link></li>
                </ul>
                <div className='Navbar-avatar'>
                {this.props.user === null || localStorage.length === 0 ? <Link to="/signup">Signup</Link> : null}
                    {this.props.user === null || localStorage.length === 0 ? null : <Link to="/login" onClick={this.props.logout}>Logout</Link>}
                </div>
            </div>
        )
    }

}


export default withRouter(Navbar)