import React from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';

import Navbar from './Navbar'
import LoginContainer from './Login/LoginContainer'
import Home from './Home/Home'
import UserInfoContainer from './Account/UserInfoContainer'
import Media from './Media/MediaContainer'
import Teams from './Teams/TeamContainer'
import Profile from './Profile/ProfileContainer'
import TeamShowPage from './Teams/TeamShowPage';
import swal from 'sweetalert';


class App extends React.Component {

  constructor() {
    super()
    this.state ={
      currentUser: null,
      teams: [],
      players: [],
      favoritePlayers: [],
      favoriteTeams: [],
    }
  }

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  removeUser = () => {
    this.setState({currentUser: null})
  }

  componentDidMount(){
    this.getCurrentUser()
    this.getTeams()
  }

  getToken(){
    // check if token is valid and set state 
    fetch(`http://localhost:3001/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(r => r.json() )
    .then(data => {
      if (data.user_id) {
        this.setState({currentUser: data})
      }
      console.log(data);
    })
  }

  
  getCurrentUser = () => {
    // check if token is valid and set state 
    fetch(`http://localhost:3001/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(r => r.json() )
    .then(data => {
      if (data.user_id) {
        this.setState({currentUser: data})
      }
      // console.log(data);
    })
  }

  getTeams = () => {
  fetch("http://localhost:3001/teams")
        .then(resp => resp.json())
        .then(teamData => {
            
            this.setState({teams: teamData})
        })
      }

      changeUserState = (props) => {
        this.setState({ currentUser: props })
      }


      favoriteNbaTeam = (id, name) => {
        // console.log("hit", id)
        const alreadyFollowed = this.state.favoriteTeams.some(p => p.team.name === name)
    
        if (alreadyFollowed === true){
          return swal({
            icon: "info",
            text: "Team Already Followed"
        })} else if (this.state.currentUser === null) {
          return swal({
            icon: "error",
            text: "Must Be Signed In To Follow Team"
        })
        } else {
          const obj = {
            user_id: this.state.currentUser.id,
            team_id: id
        }
        fetch("http://localhost:3001/user_teams", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(data => {
              this.setState({ favoriteTeams: [...this.state.favoriteTeams, data] })
              return swal({
                icon: "success",
                text: "Followed Team"
            })
        })
      }
    }


      favoriteNbaPlayer = (id, name) => {
        // console.log("hit", id)
        const alreadyFollowed = this.state.favoritePlayers.some(p => p.player.full_name === name)
    
        if (alreadyFollowed === true){
          return swal({
            icon: "info",
            text: "Player Already Followed"
        })} else if (this.state.currentUser === null) {
          return swal({
            icon: "error",
            text: "Must Be Signed In To Follow Player"
        })
        } else {
          const obj = {
            user_id: this.state.currentUser.id,
            player_id: id
        }
        fetch("http://localhost:3001/user_players", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(data => {
              this.setState({ favoritePlayers: [...this.state.favoritePlayers, data] })
              return swal({
                icon: "success",
                text: "Followed Player"
            })
        })
      }
    }

  render() {
  return (
    <div className="App">
      <Navbar isLogged={!!this.state.currentUser} removeUser={this.removeUser} firstName={this.state.currentUser}/>
      {
        this.state.currentUser ?
        < Switch >

          <Route exact path='/' render={ () => < Home/>} />
            
          <Route exact path='/user' render={ () => < UserInfoContainer/>} />
               
          <Route exact path='/articles' render={ () => < Media/>} />
        
          <Route path='/team' render={ () =>   < Teams favs={this.favoriteNbaTeam}/>} />

          <Route path='/team/:id' render={ () =>   < TeamShowPage favs={this.favoriteNbaPlayer}/>} />

          <Route path='/profile' render={ () =>   < Profile user={this.state.currentUser} favTeams={this.state.favoriteTeams} favsPlayers={this.state.favoritePlayers}/> } />

          {this.state.teams.map(team => {
            // debugger
            return (
              <Route exact path={"/nba/teams/" + team.name} key={team.id} render={() => (
                <TeamShowPage key={team.id} team={team} favs={this.favoriteNbaPlayer} />
              )} />

            )
              })}
            
          <Route path='/' render={() =>      <div>
                                        404: Page not found 
                                            </div> } />
       
        </ Switch >
        // add all the components that we want to see when 
        // logged in
        :
      <LoginContainer setUser={this.setUser} />
      }
    </div>
  );
    }
}

export default App;



