import React from 'react'
import TeamShowPage from './TeamShowPage'
import { Grid, Dropdown, Segment, Card } from 'semantic-ui-react'
import {Link, Route} from 'react-router-dom' 



class TeamCards extends React.Component {
    
    render(){

        // const src = '/images/wireframe/white-image.png'

        // let {image} =  this.props.result
        return(
            
        <div>
            
            <Grid relaxed='very' columns={5}>
                {this.props.teams.map(team => {
                    return (
                        <Grid.Column>
                            <TeamShowPage team={team} key={team.id} favoriteTeam={this.props.favs}/>
                        </Grid.Column>
                    )
                })}
                </Grid>
            {/* < TeamShowPage /> */}
          

        </div>
        )

    }

}

export default TeamCards