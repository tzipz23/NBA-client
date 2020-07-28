import React from 'react'
import TeamShowPage from './TeamCard'
import { Grid, Search} from 'semantic-ui-react'
import TeamCard from './TeamCard'
// import {Link, Route} from 'react-router-dom' 



class TeamCardContainer extends React.Component {

    state = {
        teams: [],
        searchTeams: this.props.players,
        // filteredTeams: [],
        search: ""
    }
    
    render(){

        // const src = '/images/wireframe/white-image.png'

        // let {image} =  this.props.result
        return(
            
        <div>
            <Grid.Column>
                    <Search onSearchChange={this.onChangeSearch}/>
            </Grid.Column>
            
            <Grid relaxed='very' columns={5}>
                {this.props.teams.map(team => {
                    return (
                        <Grid.Column>
                            {/* <TeamShowPage team={team} key={team.id} favoriteTeam={this.props.favorTeam} favPlayer={this.props.favorplayer}/> */}
                            <TeamCard team={team} key={team.id} favoriteTeam={this.props.favorTeam} favPlayer={this.props.favorplayer} />
                        </Grid.Column>
                            // <TeamCard team={team} favoriteTeam={this.props.favorTeam}/>
                    )
                })}
                </Grid>
            {/* < TeamShowPage /> */}
          

        </div>
        )

    }

}

export default TeamCardContainer