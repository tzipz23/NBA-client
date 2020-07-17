import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './TeamContainer.css'

import TeamCards from './TeamCards'
import TeamShowPage from './TeamShowPage'





class ProfileContainer extends React.Component {

    render(){
        
        return(
        <div>
            < TeamCards />
            

        </div>
        )

    }

}

export default ProfileContainer