import React from 'react'
// import TeamShowPage from './TeamCard'
import { Grid, Segment, Dropdown} from 'semantic-ui-react'
import TeamCard from './TeamCard'
// import {Link, Route} from 'react-router-dom' 
import kobe2 from '../images/kobe2.jpg'




class TeamCardContainer extends React.Component {

    state = {
        teams: [],
        searchTeams: this.props.players,
        // filteredTeams: [],
        dropdownTeam: [],
        filteredTeam: []
    }
    onChangeTeams = (event) => {
        let filter = this.props.teams.filter(team => event.target.textContent === team.name)
        this.setState({ filteredTeam: filter })
        this.setState({ dropdownTeam: event.target.textContent })
    }

    render(){
        const teams = this.props.teams.map(team => ({
            key: team.name,
            text: team.name,
            value: team.name,
        }))
        teams.unshift({
            key: "All Teams",
            text: "All Teams",
            value: "All Teams"
        })
        return(
            <div className="nba-team-index">
                {/* <h1>NBA teams</h1> */}
                <Segment>
                    <h1> NBA<img src={'https://media.giphy.com/media/ZdfmJ0rlZccbM8o6qm/giphy.gif'} style={{height: '16rem', width: '10rem'}}></img> Teams </h1>
                    {/* <Image src={process.env.PUBLIC_URL + '/SPN.png'} centered className="spn-daily-news"/> */}
                </Segment>
                <br />
                <Grid relaxed='very' columns={1}>
                    <Grid.Column>
                        <h4>Select Team</h4>
                        <Dropdown placeholder='All Teams' search selection options={teams} onChange={this.onChangeTeams} />
                    </Grid.Column>
                </Grid>
                {/* <img src="https://i0.wp.com/textlists.info/wp-content/uploads/nba.jpg?fit=700%2C330&ssl=1" ></img> */}
                <br /> <br /> <br />
                {/* <img src={this.props.league.logo_img} alt="logo"/> */}
                {this.state.filteredTeam.length === 0 ? 
                <Grid relaxed='very' columns={5}>
                {this.props.teams.map(team => {
                    return (
                        <Grid.Column>
                        <TeamCard team={team} key={team.id} favoriteTeam={this.props.favorTeam} favPlayer={this.props.favorplayer} />                        </Grid.Column>
                    )
                })}
                </Grid>
                :
                <Grid relaxed='very' columns={5}>
                {this.state.filteredTeam.map(team => {
                    return (
                        <Grid.Column>
                            <TeamCard team={team} key={team.id} favoriteTeam={this.props.favorTeam} favPlayer={this.props.favorplayer} />                        </Grid.Column>
                    )
                })}
                </Grid>
                }
            </div>
        )
    }
}

export default TeamCardContainer







{/* <TeamCard team={team} key={team.id} favoriteTeam={this.props.favorTeam} favPlayer={this.props.favorplayer} /> */}