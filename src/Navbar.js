import React from 'react'
import {Link} from 'react-router-dom'

// import logo from './images/JobTestr.png'
import logo from './images/medialogo.png'

import './Navbar.css'

class Navbar extends React.Component {

    logout = () => {
        console.log('logging out')
        localStorage.removeItem('token')
        this.props.removeUser()
    }

    render(){
        return(
            <div className ='Navbar'>
               <div className='Navbar-logo'>
                    <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>
                    </div>
                <ul className='Navbar-menu'>
                    <li className='Navbar-menu-item'><Link to='/articles'>Media</Link></li>
                    <li className='Navbar-menu-item'><Link to='/team'>Teams</Link></li>
                    <li className='Navbar-menu-item'><Link to='/profile'>Profile</Link></li>
                </ul>
                <div className='Navbar-avatar'>
                { this.props.isLogged ? <p>Hello, <Link to='/user'>{this.props.firstName.user_name}</Link> </p> : ' '}
                    { this.props.isLogged ? <button onClick={this.logout}>Logout</button> : null}
                </div>
            </div>
        )
    }

}

export default Navbar;