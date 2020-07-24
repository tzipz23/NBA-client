import React from 'react'
import {Segment, Grid, Image, Loader} from 'semantic-ui-react'
import PlayerCards from './PlayerCards.js'



class TeamShowPage extends React.Component {

    render(){
        const {image} = this.props.team
        
        return(
        <div>
            
            <Grid relaxed='very' columns={6}>
                {this.props.team.players.map(player => {
                    return (
                        <Grid.Column centered>
                            <Segment style={{background: `url(${image})`}}>
                                <PlayerCards player={player} key={player.id} favoritePlayer={this.props.favs}/>
                            </Segment>
                        </Grid.Column>
                    )   
                })}
                </Grid>
              
               
           

        </div>
        )

    }

}

export default TeamShowPage