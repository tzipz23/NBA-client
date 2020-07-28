import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css';

import Navbar from './Navbar'
import LoginContainer from './Login/LoginContainer'
import Register from './Login/Register'
import Home from './Home/Home'
import UserInfoContainer from './Account/UserInfoContainer'
import Media from './Media/MediaContainer'
import Teams from './Teams/TeamContainer'
import Profile from './Profile/ProfileContainer'
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
    alreadyFollowed: [],
    displayed: 0,
    filteredPlayers: [],
    followerList: [],
    followingList: [],
    savedArticles: [],
    searchedUser: null,
    searchedUserFollowingList: [],
    searchedUserFollowerList: [],
    searchedUserFavPlayers: [],
    searchedUserFavTeams: [],
    searchedUserFavoritePlayersIds: [],
    searchedUserFavoriteTeamsIds: []

  }

  searchedUser = (user) => {

    let id = user.id
    // debugger
    let userObj = {}
    fetch(`http://localhost:3001/user/${id}`)
    
    .then(resp => resp.json())
    .then(resp => {
      // debugger
      userObj['id'] = resp.id
      userObj["username"] = resp.username
      userObj["followers"] = resp.followed_by
      userObj["following"] = resp.followers
      let followingList = []
      let followedList = []
      let searchedUserFavoritePlayersIds = []
      let searchedUserFavoriteTeamsIds = []
      let searchedUserFavPlayers = []
      let searchedUserFavTeams = []
          resp.follows.forEach((user) => followingList.push(user.followed_id))
          resp.followed_by.forEach((user) => followedList.push(user.follower_id))
          resp.favoriteNbaPlayers.forEach((player) => searchedUserFavoritePlayersIds.push(player.id))
          resp.favoriteNbaPlayers.forEach((player) => searchedUserFavPlayers.push(player))
          resp.favoriteNbaPlayers.forEach((team) => searchedUserFavoriteTeamsIds.push(team.id))
          resp.favoriteNbaPlayers.forEach((team) => searchedUserFavTeams.push(team))

          this.setState({
            searchedUserFollowingList: followingList,
            searchedUserFollowerList: followedList,
            searchedUser: userObj,
            searchedUserFavoritePlayersIds: searchedUserFavoritePlayersIds,
            searchedUserFavoriteTeamsIds: searchedUserFavoriteTeamsIds,
            searchedUserFavoritePlayers: searchedUserFavPlayers,
            searchedUserFavoriteTeams: searchedUserFavTeams

          })

    })


  }

  componentDidMount() {
    // fetch("https://spn-backend.herokuapp.com/leagues")
    // .then(resp => resp.json())
    // .then(data => {
    //   const nba = data.find(league => league.name === "NBA")
    //   this.setState({ nbaLeague: nba })
    //   this.setState( { leagues: data })
    // })
    
    fetch("http://localhost:3001/teams")
    .then(resp => resp.json())
    .then(data => {
      const teams = data.filter(team => team.sport_title === "NBA" )
      // console.log(teams)
      this.setState({ Nbateams: teams })
      this.setState({ teams: data })
    })

    fetch("http://localhost:3001/players")
    .then(resp => resp.json())
    .then(data => {
      this.setState({ players: data })
      this.display(data)
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

    fetch("http://localhost:3001/user_articles")
        .then(resp => resp.json())
        .then(data => {
          // debugger
          this.setState({savedArticles: data})
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
    fetch(`http://localhost:3001/users/index/${this.state.currentUser.id}`, {
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
          text: "Player Unfollowed"
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
            text: "Followed Player"
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
            text: "Followed Team"
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
    text: "Team Unfollowed"
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
          <Route exact path='/team' render={() => <Teams players={this.state.players} teams={this.state.Nbateams} league={this.state.nbaLeague} user={this.state.currentUser} favs={this.favoriteNbaTeam}/>} />
          {/* Login */}
          <Route exact path="/login" render={ () => (
          this.state.currentUser === null || localStorage.length === 0 ? 
          <LoginContainer loginUser={this.handleLogin} setUser={this.setUser}/>
          :
          <Redirect to="/profile"/>
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
        {/* <Footer /> */}
      </div>
    );
  }
}


export default App;











{/* <Navbar isLogged={!!this.state.currentUser} removeUser={this.removeUser} firstName={this.state.currentUser}/>
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
      } */}