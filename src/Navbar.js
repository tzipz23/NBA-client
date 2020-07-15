import React from 'react'
import {Link} from 'react-router-dom'

// import logo from './images/JobTestr.png'

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
                    {/* <Link to='/'><img style={{height: '3rem', width: '3rem'}} src={logo} alt='logo'/></Link> */}
                </div>
                <ul className='Navbar-menu'>
                    <li className='Navbar-menu-item'><Link to='/research'>Media</Link></li>
                    <li className='Navbar-menu-item'><Link to='/search'>Teams</Link></li>
                    <li className='Navbar-menu-item'><Link to='/search'>Profile</Link></li>
                </ul>
                <div className='Navbar-avatar'>
                    <Link to='/user'>avatar</Link>
                    { this.props.isLogged ? <button onClick={this.logout}>Logout</button> : null}
                </div>
            </div>
        )
    }

}

export default Navbar;