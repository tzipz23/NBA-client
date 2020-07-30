import React from 'react'
import ProfilePic from './ProfilePic'
// import swal from 'sweetalert';
import { Card, Image,Button, Grid, Segment, Menu } from 'semantic-ui-react'



class UserShowPage extends React.Component {

    state = {
        user: null,
        
        followerList: [],
        followingList: [],

        favPlayers:[],
        favTeams:[],
        activeItem: 'bio',

        follows: []
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    componentDidMount(){

         fetch(`http://localhost:3001/user/${this.props.id}`)
        .then(resp => resp.json())
        .then(data => {
        // debugger
        //   let filtered = data.filter(player => player.user.id === this.props.user.id)
          this.setState({user: data})
        })

        // Get their followers

        fetch(`http://localhost:3001/follow/${this.props.id}/followers`)
        .then(resp => resp.json())
        .then(data => {
        // debugger
        //   let filtered = data.filter(player => player.user.id === this.props.user.id)
          this.setState({followerList: [...data]})
        })

        // Get their following
        fetch(`http://localhost:3001/follow/${this.props.id}/following`)
        .then(resp => resp.json())
        .then(data => {
        // debugger
        //   let filtered = data.filter(player => player.user.id === this.props.user.id)
          this.setState({followingList: [...data]})
        })

        // console.log(this.props.id)
        fetch('http://localhost:3001/user_players',{
        method: "GET",
        headers: {
            "Accept": "application/json",  "Content-Type": "application/json"
        }
        }).then(resp => resp.json())
        .then(data => {
            let userInfo = data.filter(user_player => parseInt(this.props.id) === user_player.user_id)
    //   console.log(typeof (this.props.id))
    //   console.log(userInfo)
            this.setState({ favPlayers: userInfo})
        })

        fetch('http://localhost:3001/user_teams',{
        method: "GET",
        headers: {
            "Accept": "application/json",  "Content-Type": "application/json"
        }
        }).then(resp => resp.json())
        .then(data => {
            let userInfo = data.filter(user_team => parseInt(this.props.id) === user_team.user_id)
    //   console.log(typeof (this.props.id))
    //   console.log(userInfo)
            this.setState({...this.state, favTeams: userInfo})
        })

        fetch('http://localhost:3001/follow')
        .then(resp => resp.json())
        .then(data => this.setState({user_join: data}))
    }


    submitFollow = () => {
        let follower_id = localStorage.getItem("user_id")
        let followed_id = this.props.id
        if (follower_id === followed_id){
            return 
        }

        fetch('http://localhost:3001/follow',{
        method: "POST",
        headers: {
            "Accept": "application/json",  "Content-Type": "application/json"
        },
        body: JSON.stringify({follower_id: follower_id,
                            followed_id: followed_id
        })

        }).then(resp => resp.json())
        .then(data => {
    //   console.log(typeof (this.props.id))
      console.log(data)
             this.setState({followerList: [...this.state.followerList, data]})
        })
    }

    UnSubmitFollow = () => {
        let follower_id = localStorage.getItem("user_id")
        let followed_id = this.props.id
        if (follower_id === followed_id){
            return 
        }
        
        fetch('http://localhost:3001/follow',{
        method: "DELETE",
        headers: {
            "Accept": "application/json",  "Content-Type": "application/json"
        },
        body: JSON.stringify({follower_id: follower_id,
                            followed_id: followed_id
        })

        }).then(resp => resp.json())
        .then(delItem => {
            console.log(delItem)
            let followersArray = this.state.followerList.filter( (relationship) => relationship.id !== delItem.id )
        //   console.log(typeof (this.props.id))
            this.setState({followerList: followersArray})
        })
    }



    render(){
        const user_id = localStorage.getItem('user_id')
        let isFollower = false
        if (this.state.followerList) {
           isFollower = this.state.followerList.some( relationship => relationship.follower_id === parseInt(user_id) )
        }
       
        return(
        <div className="profile-background" >
            <ProfilePic />
            <br />
          

            <div>
                <Grid columns={2} divided >
                    <Grid.Row stretched>
                    <Grid.Column className="profile-user-card" width={6} >
                            <Segment  >
                                <Card centered="true" fluid="true" raised="false" >
                                    <Image alt="profile" src={this.state.user ? this.state.user.image : null} wrapped ui={false} className="profile-user-image" />
                                    
                                    <Card.Content>
                                    <Card.Header>{this.state.user ? this.state.user.user_name : null}</Card.Header> 
                                    <br />

                                    { isFollower ? <Button color="red" onClick={this.UnSubmitFollow}>UnFollow</Button>  :  <Button color="green" onClick={this.submitFollow}>Follow</Button> }
                                              
                                    
                                    </Card.Content>
                                    <Card.Content extra>
                                    {/* <Menu tabular>
                                                    <Menu.Item
                                                    name='Followers'
                                                    active={this.state.activeItem === 'Followers'}
                                                    onClick={this.handleItemClick}
                                                   // value={this.state.followerList.length}
                                                    />
                                                    <Menu.Item
                                                    name='Following'
                                                    active={this.state.activeItem === 'Following'}
                                                    onClick={this.handleItemClick}
                                                    />
                                                </Menu> */}
                                         Followers {this.state.followerList.length} / Following {this.state.followingList.length}


                                    </Card.Content>
                                    
                                </Card>
                            </Segment>
                    </Grid.Column> 
                    {/* Second Column */}
                    <Grid.Column width={10} style={{height: '35%'}}> 
                    {/* <br /> */}
                    <Segment>
                    <h1 style={{fontFamily: "Impact"}}>Favorite Players</h1>
                    {/* Favorite Players Ternary */}
                    {/* {this.state.user ? */}
                    {this.state.favPlayers === [] ?
                
                    <Card centered="true">
                    <Card.Content>
                    <Image
                        // floated='center'
                        size='large'
                        src=""
                    />
                        <Card.Description>
                            <h1 style={{fontFamily: "Impact"}}> No Favorite Players </h1>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content>
                        </Card.Content>
                    </Card>
                    :
                    <div>
                    {this.state.favPlayers ? this.state.favPlayers.map(user_player => (
                        <Card key={user_player.id} centered="true">
                            <Card.Content>
                            <Image
                                floated='right'
                                size='small'
                                // this.state.user ? this.state.user.fullname : null}
                                // src={this.state.user_player ? this.state.user_player.player.player_image : null}
                                src={user_player.player.player_image}

                                // src={this.state.favPlayers ? this.state.favPlayers.player.player_image : null}
                            />
                            <Card.Header>{user_player.player.full_name}</Card.Header>
                            <Card.Meta>{user_player.player.jersey_number}</Card.Meta>
                            <Card.Meta>{user_player.player.team.name }</Card.Meta>
                            <Card.Description>
                                {/* <p>Position: {this.state.user_player ? this.state.user_player.player.position : null}</p>
                                <p>League: {this.state.user_player ? this.state.user_player.player.league : null}</p> */}
                                <p>Position: {user_player.player.position}</p>
                                <p>League: {user_player.player.league}</p>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content>
                            <div className='ui two buttons'>
                                {/* <Button basic color='red' onClick={() => this.props.delete(parseInt(user_player.id))}>
                                Unfavorite
                                </Button> */}
                            </div>
                            </Card.Content>
                        </Card>
                            
                        ))
                        : null}
                    
                        
                    </div>
    }
                    
                    {/* : null} */}
                    </Segment>
                    </Grid.Column>
                    <hr className="dividers hr-md-left-0"/>
                    {/* Column Three */}
                    <Grid.Column width={10} style={{height: '35%'}}>
                        {/* <br /> */}
                        <Segment>
                        <h1 style={{fontFamily: "Impact"}}>Favorite Teams</h1>
                        {/* Tenary for Favorite Players Or Not */}
                        {this.state.favTeams.length === [] ?
                        <Card centered="true">
                        <Card.Content>
                        <Image
                            // floated='center'
                            size='big'
                            src=""
                        />
                            <Card.Description>
                                <h1 style={{fontFamily: "Impact"}}> No Favorite Teams </h1>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content>
                            </Card.Content>
                        </Card>
                        :
                        <div>
                        {this.state.favTeams ? this.state.favTeams.map(user_team => (
                        <Card key={user_team.id} centered="true">
                            <Card.Content>
                            <Image
                                // floated='center'
                                size='small'
                                // src={this.state.user_team ? this.state.user_team.team.image : null}
                                src={user_team.team.image }
                            />
                            <Card.Header>{user_team.team.name }</Card.Header>
                            <Card.Description>
                                <p>Venue: {user_team.team.venue}</p>
                                <p>League: {user_team.team.market }</p>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content>
                            <div className='ui two buttons'>
                                {/* <Button basic color='red' onClick={() => this.props.deleteTeam(parseInt(user_team.id))}>
                                Unfavorite
                                </Button> */}
                            </div>
                            </Card.Content>
                        </Card>
                        ))
                        : null}
                    
                        </div>
    }
                     </Segment>
                    </Grid.Column>
                    </Grid.Row>
                    
              </Grid>
              
            </div>
        
        </div>
        )

    }

}

export default UserShowPage











