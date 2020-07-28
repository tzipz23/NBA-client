import React from 'react'
import {Link} from 'react-router-dom'
import {Search, Grid} from 'semantic-ui-react'
import SearchNav from './SearchNav'


// import logo from './images/JobTestr.png'
import logo from './images/medialogo.png'

import './Navbar.css'

// const Navbar = (props) => {
//     return (
//         <div className ='Navbar'>
           
//                 <div className='Navbar-logo'>
//                 <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>                </div>
//                 <ul className='Navbar-menu'>
//                 {/* <Grid.Column>
//                     <Search onSearchChange={this.onChangeSearch}/>
//                     < Search placeholder='search users'/>
//                 </Grid.Column> */}
                
//                 <li className='Navbar-menu-item'><Link to='/articles'>Media</Link></li>
//                     <li className='Navbar-menu-item'><Link to='/team'>Teams</Link></li>
//                     <li className='Navbar-menu-item'><Link to='/profile'>Profile</Link></li>
//                 </ul>
//                 <div className='Navbar-avatar'>
//                 {props.user === null || localStorage.length === 0 ? <Link to="/signup">Signup</Link> : null}
//                     {props.user === null || localStorage.length === 0 ? null : <Link to="/login" onClick={props.logout}>Logout</Link>}
//                 </div>
//             </div>
       
//     )
// }

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

    // fixState = (event) =>{
    //     let searched = event.target.value
    //     let excludedLoggedInUser = this.props.users.filter((user) => user.username !== this.props.loggedInUser.username) 
    //     let found = excludedLoggedInUser.filter((user) => user.username.includes(searched))
    //     found = found.map(boxer => ({title: boxer.username}))
    //     this.setState({
    //         searching: searched,
    //         boxers: found
    //     })
    // }

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
        let filteredUser = this.state.users.find((user) => user.first_name == event.target.innerText)
        // debugger
        this.props.searchedUser(filteredUser)
    }

    render(){
        return(
            <div className ='Navbar'>
                <div className='Navbar-logo'>
                <Link to='/'><img style={{height: '9rem', width: '9rem'}} src={logo} alt='logo'/></Link>                </div>
                <ul className='Navbar-menu'>
                <Grid.Column>
                    <Search placeholder='search users' results={this.state.filteredUser} onSearchChange={this.onSearchChange} onResultSelect={this.handleResultSelect}/>
                    {/* < Search placeholder='search users'  onResultSelect={event => this.selectedUser(event)} results={this.state.boxers} value={this.state.searching} onSearchChange={event => this.fixState(event)}/> */}
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


export default Navbar;