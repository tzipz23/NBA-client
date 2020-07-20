import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './TeamContainer.css'
import TeamCards from './TeamCards'
import TeamShowPage from './TeamShowPage'


class TeamContainer extends React.Component {
    state = {
        teams: []
    }

    componentDidMount(){
        fetch("http://localhost:3001/teams")
        .then(resp => resp.json())
        .then(teamData => {
            
            this.setState({teams: teamData})
        })
    }

    render(){
        
        return(
        <div>
            < TeamCards teams={this.state.teams}/>
        </div>
        )

    }

}

export default TeamContainer