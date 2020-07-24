import React from 'react'
// import {Switch, Route} from 'react-router-dom'
import './TeamContainer.css'
import TeamCardContainer from './TeamCardContainer'


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
            < TeamCardContainer teams={this.state.teams} favorPlayer={this.props.favs} favorTeam={this.props.favs} />
        </div>
        )

    }

}

export default TeamContainer