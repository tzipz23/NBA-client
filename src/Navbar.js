import React from 'react'
import {Link} from 'react-router-dom'

// import logo from './images/JobTestr.png'
import logo from './images/medialogo.png'

import './Navbar.css'

const Navbar = (props) => {
    return (
        <div className ='Navbar'>
                <div className='Navbar-logo'>
                <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>                </div>
                <ul className='Navbar-menu'>
                <li className='Navbar-menu-item'><Link to='/articles'>Media</Link></li>
                    <li className='Navbar-menu-item'><Link to='/team'>Teams</Link></li>
                    <li className='Navbar-menu-item'><Link to='/profile'>Profile</Link></li>
                </ul>
                <div className='Navbar-avatar'>
                {props.user === null || localStorage.length === 0 ? <Link to="/signup">Signup</Link> : null}
                    {props.user === null || localStorage.length === 0 ? null : <Link to="/login" onClick={props.logout}>Logout</Link>}
                </div>
            </div>
       
    )
}

export default Navbar;






{/* <div className ='Navbar'>
               <div className='Navbar-logo'>
                    <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>
                    </div>
                <ul className='Navbar-menu'>
                    <li className='Navbar-menu-item'><Link to='/articles'>Media</Link></li>
                    <li className='Navbar-menu-item'><Link to='/team'>Teams</Link></li>
                    <li className='Navbar-menu-item'><Link to='/profile'>Profile</Link></li>
                </ul> */}