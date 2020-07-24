import React from 'react'
import TeamShowPage from './TeamCard'
import { Grid} from 'semantic-ui-react'
import TeamCard from './TeamCard'
// import {Link, Route} from 'react-router-dom' 



class TeamCardContainer extends React.Component {
    
    render(){

        // const src = '/images/wireframe/white-image.png'

        // let {image} =  this.props.result
        return(
            
        <div>
            
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