import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css';

import Navbar from './Navbar'
import LoginContainer from './Login/LoginContainer'
// import Register from './Login/Register'
import Home from './Home/Home'
// import UserInfoContainer from './Account/UserInfoContainer'
import Media from './Media/MediaContainer'
import Teams from './Teams/TeamContainer'
import Profile from './Profile/ProfileContainer'
import UserShowPage from './Profile/UserShowPage'
import TeamShowPage from './Teams/TeamShowPage';
import swal from 'sweetalert';



class App extends React.Component {
  state = {
    players: [],
    Nbateams: [],
    teams: [],
    nbaLeague: [],
    leagues: [],
    currentUser: null,
    favoritePlayers: [],
    favoriteTeams: [],
    filteredPlayers: [],
    followerList: [],
    followingList: [],
    
    searchedUser: null,
   

  }


  componentDidMount() {
    
    fetch("http://localhost:3001/teams")
    .then(resp => resp.json())
    .then(data => {
      // const teams = data.filter(team => team.sport_title !== "NBA" )
     
    //  this.setState({ Nbateams: teams,  })
      this.setState({ teams: data })
    })

    fetch("http://localhost:3001/players")
    .then(resp => resp.json())
    .then(data => {
      this.setState({ players: data })
     
    })

    if(localStorage.getItem("token")){
    fetch("http://localhost:3001/auth", {
      headers: { "Authenticate": localStorage.token }
    })
    .then(resp => resp.json())
    .then(user => {
      // debugger
      this.handleLogin(user)
    })
    } else {
      console.log("No Token Found")
    }

    fetch("http://localhost:3001/user_players")
        .then(resp => resp.json())
        .then(data => {
          // debugger
          this.setState({favoritePlayers: data})
        })
  }

  changeUserState = (props) => {
    this.setState({ currentUser: props })
  }

  handleLogin = (user) => {
    // Fetching User_Player data for User signed in
    fetch("http://localhost:3001/user_players")
    .then(resp => resp.json())
    .then(data => {
      
      let userInfo = data.filter(user_player => this.state.currentUser.id === user_player.user_id)
      this.setState({ favoritePlayers: userInfo })
      
    })
    // Fetching User_Team data for User signed in
    fetch("http://localhost:3001/user_teams")
    .then(resp => resp.json())
    .then(data => {
      let userInfo = data.filter(user_team => this.state.currentUser.id === user_team.user_id)
      this.setState({ favoriteTeams: userInfo })
    })
    // Set the state of currentUser logged in!
    this.setState({ currentUser: user })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({ currentUser: null })
    this.setState({ favoritePlayers: [] })
    this.setState({ favoriteTeams: [] })
  }

  deleteProfile = () => {
    // debugger
    fetch(`http://localhost:3001/user/${this.state.currentUser.id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        localStorage.clear()
        this.setState({ currentUser: null })
        this.setState({ favoritePlayers: [] })
        this.setState({ favoriteTeams: [] })
        swal({
            icon: "info",
            text: "Profile Deleted"
        })
    })
}

  findUserPlayer = (id) => {
    fetch("http://localhost:3001/user_players")
    .then(resp => resp.json())
    .then(data => {
      let foundPlayer = data.find(userPlayer => userPlayer.id === id)
      
        this.handleDeleteFavorite(foundPlayer.id)
        swal({
          icon: "info",
          text: "Player Unfavorited"
      })
      }
    )
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
    // debugger
    fetch("http://localhost:3001/user_players", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => {
      // debugger
          this.setState({ favoritePlayers: [...this.state.favoritePlayers, data] })
          return swal({
            icon: "success",
            text: "Favorited Player"
        })
    })
  }
}

  handleDeleteFavorite = (id) => {
    fetch(`http://localhost:3001/user_players/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
      let filtered = this.state.favoritePlayers.filter(players => players.id !== data.id)
      this.setState({ favoritePlayers: filtered })
    })
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
            text: "Favorited Team"
        })
    })
  }
}

handleDeleteFavoriteTeam = (id) => {
  fetch(`http://localhost:3001/user_teams/${id}`, {
    method: "DELETE"
  })
  .then(resp => resp.json())
  .then(data => {
    let filtered = this.state.favoriteTeams.filter(teams => teams.id !== data.id)
    this.setState({ favoriteTeams: filtered })
  })
  swal({
    icon: "info",
    text: "Team Unfavorited"
})
}

  display = (prop) => {
      const filter = prop.slice(this.state.displayed, this.state.displayed+20)
      this.setState({ filteredPlayer: filter })
  }

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  render() {
    return (
      <div className="App">
        {/* Nav Bar */}
        <Navbar searchedUser={this.searchedUser} user={this.state.currentUser} logout={this.handleLogout} league={this.state.nbaLeague} teams={this.state.Nbateams}/>
        <br />
        <div className="main-container">
        <Switch>
          {/* Home */}
          <Route exact path="/" render={() => <Home user={this.state.currentUser}/>}/>
          {/* NBA */}
          <Route exact path='/articles' render={ () => < Media/>} />          {/* Nba/Players */}
          {/* <Route exact path="/nba/players" render={ () => <NbaPlayerIndex players={this.state.players} filtered={this.state.filteredPlayers} teams={this.state.Nbateams} league={this.state.nbaLeague} user={this.state.currentUser} favs={this.favoriteNbaPlayer}/>} /> */}
          {/* NBA/Teams */}


          <Route exact path='/user/:id' render={ (routerProps) => < UserShowPage id={routerProps.match.params.id} /> } /> 


          <Route exact path='/team' render={() => <Teams players={this.state.players} teams={this.state.teams} league={this.state.nbaLeague} user={this.state.currentUser} favs={this.favoriteNbaTeam}/>} />
          {/* Login */}
          <Route exact path="/login" render={ () => (
          this.state.currentUser === null || localStorage.length === 0 ? 
          <LoginContainer loginUser={this.handleLogin} setUser={this.setUser}/>
          :
          <Redirect to="/articles"/>
          )} />
          {/* About */}
          
          {/* Profile */}
          <Route exact path="/profile" render={ () => (
          this.state.currentUser === null || localStorage.length === 0 ?
          <Redirect to="/login"/>
          :
          <Profile user={this.state.currentUser} edit={this.changeUserState} deleteProfile={this.deleteProfile} favsPlayers={this.state.favoritePlayers} favTeams={this.state.favoriteTeams} delete={this.findUserPlayer} deleteTeam={this.handleDeleteFavoriteTeam} articles={this.state.savedArticles} followingList={this.state.followingList} followerList={this.state.followerList}/>
          )} />
          {/* SignUp */}
          <Route exact path='/signup' render={ () => (
          this.state.currentUser === null || localStorage.length === 0 ?
          <LoginContainer loginUser={this.handleLogin} setUser={this.setUser}/>
          :
          <Profile user={this.state.currentUser} edit={this.changeUserState} deleteProfile={this.deleteProfile} favsPlayers={this.state.favoritePlayers} favTeams={this.state.favoriteTeams} delete={this.findUserPlayer} deleteTeam={this.handleDeleteFavoriteTeam} articles={this.state.savedArticles}/>
          )} />
          {/* Team Pages */}
          {this.state.teams.map(team => {
            // debugger
            return (
              <Route exact path={"/nba/teams/" + team.name} key={team.id} render={() => (
                <TeamShowPage key={team.id} team={team} favs={this.favoriteNbaPlayer} filtered={this.state.filteredPlayers} players={this.state.players}/>
              )} />
            
            )
          })}
         
        </Switch>
        </div>
        
      </div>
    );
  }
}


export default App;











/* <Navbar isLogged={!!this.state.currentUser} removeUser={this.removeUser} firstName={this.state.currentUser}/>
      {
        this.state.currentUser ?
        < Switch >

          <Route exact path='/' render={ () => < Home/>} />
            
          <Route exact path='/user' render={ () => < UserInfoContainer/>} />
               
          <Route exact path='/articles' render={ () => < Media/>} />
        
          <Route path='/team' render={ () =>   < Teams favs={this.favoriteNbaTeam} user={this.state.currentUser}/>} />

          <Route path='/team/:id' render={ () =>   < TeamShowPage favs={this.favoriteNbaPlayer} user={this.state.currentUser}/>} />

          <Route path='/profile' render={ () =>   < Profile user={this.state.currentUser} edit={this.changeUserState} deleteProfile={this.deleteProfile} favTeams={this.state.favoriteTeams} favsPlayers={this.state.favoritePlayers} articles={this.state.articles} delete={this.findUserPlayer} deleteTeam={this.handleDeleteFavoriteTeam} />  } />

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
      } */