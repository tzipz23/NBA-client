import React from 'react'

import UserInfo from './UserInfo'
import UserAccount from './UserAccount'

import './UserInfoContainer.css'

class UserInfoContainer extends React.Component {
    render(){
        return(
            <div className="user-info-container">
                <UserInfo /> 
                <UserAccount />
            </div>
        )
    }
}

export default UserInfoContainer