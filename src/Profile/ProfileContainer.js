import React from 'react'
import ProfilePic from './ProfilePic'

import {Grid, Image, Icon, Button, Card, Segment, Modal, Header, Form, Menu} from 'semantic-ui-react'
import swal from 'sweetalert';
import './ProfileContainer.css'




class ProfileContainer extends React.Component {

    state = {
        name: this.props.user.first_name,
        image: this.props.user.image,
        password: "",
        modalEditOpen: false,
        modalDeleteOpen: false,
       
        followerList: [],
        followingList: [],

        favPlayers:[],
        favTeams:[],
        activeItem: 'bio',

        likes:0,
        dislikes:0
        
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount(id){
        fetch(`http://localhost:3001/user/${id}`)
        .then(resp => resp.json())
        .then(data => {
        //   let filtered = data.filter(player => player.user.id === this.props.user.id)
         console.log(data)
        //   this.setState({favPlayers: data})
        })
    }

    changeProfileInfoState = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    

    handleEditOpen = () => this.setState({ modalEditOpen: true })
    handleEditClose = () => this.setState({ modalEditOpen: false })
    handleDeleteOpen = () => this.setState({ modalDeleteOpen: true })
    handleDeleteClose = () => this.setState({ modalDeleteOpen: false })

    newProfileInfo = (event) => {
        event.preventDefault()
        const obj = {
            // name: this.state.name,
            image: this.state.image
        }
        // debugger
        fetch(`http://localhost:3001/user/${this.props.user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(data => {
        //   debugger
          this.props.edit(data)})
          this.setState({ modalOpen: false })
          swal({
            icon: "success",
            text: "Profile Updated!"
        })
    }



    render(){
        
        return(
        <div>
            < ProfilePic likes={this.likeCount} />
            <br />
            

            <div className="profile profile-background">
                <Grid columns={2} divided >
                    <Grid.Row stretched>
                    <Grid.Column className="profile-user-card" width={6} >
                            <Segment  >
                                <Card centered="true" fluid="true" raised="false" >
                                    <Image alt="profile" src={this.props.user.image} wrapped ui={false} className="profile-user-image" />
                                    
                                    <Card.Content>
                                    <Card.Header>{this.props.user.user_name}</Card.Header> 
                                    </Card.Content>
                                    <Card.Content extra>
                                    <Menu tabular>
                                                    <Menu.Item
                                                    name='Followers'
                                                    active={this.state.activeItem === 'Followers'}
                                                    onClick={this.handleItemClick}
                                                    />
                                                    <Menu.Item
                                                    name='Following'
                                                    active={this.state.activeItem === 'Following'}
                                                    onClick={this.handleItemClick}
                                                    />
                                                </Menu>
                                        Follower/ Following
                                    </Card.Content>
                                    {/* Edit Profile */}
                                    <Modal 
                                    trigger={<button type="button" className="btn btn-outline-success" id="profile-button" onClick={this.handleEditOpen} >Edit Profile</button>}
                                    open={this.state.modalEditOpen}
                                    onClose={this.handleEditClose}
                                    centered={true}
                                    >
                                        <Modal.Content>
                                        <Modal.Description>
                                            <Header>Edit Image</Header>
                                            <Form
                                            onSubmit={this.newProfileInfo}
                                            >
                                                <Form.Field>
                                                <label>Image URL</label>
                                                <input id="image" defaultValue={this.state.image} placeholder='Profile Image' onChange={this.changeProfileInfoState} required/>
                                                </Form.Field>
                                                <Button className="profile-edit-button" type='submit'>Submit</Button>
                                            </Form>
                                        </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                    {/* Delete Profile */}
                                    <Modal 
                                    trigger={<button type="button" class="btn btn-outline-danger" id="profile-button" onClick={this.handleDeleteOpen} >Delete Profile</button>}
                                    open={this.state.modalDeleteOpen}
                                    onClose={this.handleDeleteClose}
                                    centered={true}
                                    >
                                        <Modal.Header>Delete Profile</Modal.Header>
                                        <Modal.Content>
                                        <p>
                                            Are you sure you want to delete your profile?  We'll be sad to see you go!
                                        </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        <Button onClick={this.handleDeleteClose} color='red'>
                                            <Icon name='remove' /> No
                                        </Button>
                                        <Button onClick={this.props.deleteProfile} color='green'>
                                            <Icon name='checkmark' /> Yes
                                        </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </Card>
                            </Segment>
                    </Grid.Column>
                    {/* Second Column */}
                    <Grid.Column width={10} style={{height: '35%'}}> 
                    {/* <br /> */}
                    <Segment>
                    <h1 style={{fontFamily: "Impact"}}>Favorite Players</h1>
                    {/* Favorite Players Ternary */}
                    {this.props.favsPlayers.length === 0 ?
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
                    {this.props.favsPlayers.map(user_player => (
                        <Card key={user_player.id} centered="true">
                            <Card.Content>
                            <Image
                                floated='right'
                                size='small'
                                src={user_player.player.player_image}
                            />
                            <Card.Header>{user_player.player.full_name}</Card.Header>
                            <Card.Meta>{user_player.player.jersey_number}</Card.Meta>
                            <Card.Meta>{user_player.player.team.name}</Card.Meta>
                            <Card.Description>
                                <p>Position: {user_player.player.position}</p>
                                <p>League: {user_player.player.league}</p>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content>
                            <div className='ui two buttons'>
                                <Button basic color='red' onClick={() => this.props.delete(parseInt(user_player.id))}>
                                Unfavorite
                                </Button>
                            </div>
                            </Card.Content>
                        </Card>
                        ))}
                    </div>
                    }
                    </Segment>
                    </Grid.Column>
                    <hr className="dividers hr-md-left-0"/>
                    {/* Column Three */}
                    <Grid.Column width={10} style={{height: '35%'}}>
                        {/* <br /> */}
                        <Segment>
                        <h1 style={{fontFamily: "Impact"}}>Favorite Teams</h1>
                        {/* Tenary for Favorite Players Or Not */}
                        {this.props.favTeams.length === 0 ?
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
                        {this.props.favTeams.map(user_team => (
                        <Card key={user_team.id} centered="true">
                            <Card.Content>
                            <Image
                                // floated='center'
                                size='small'
                                src={user_team.team.image}
                            />
                            <Card.Header>{user_team.team.name}</Card.Header>
                            <Card.Description>
                                <p>Venue: {user_team.team.venue}</p>
                                <p>League: {user_team.team.market}</p>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content>
                            <div className='ui two buttons'>
                                <Button basic color='red' onClick={() => this.props.deleteTeam(parseInt(user_team.id))}>
                                Unfavorite
                                </Button>
                            </div>
                            </Card.Content>
                        </Card>
                        ))}
                        </div>
                        }
                     </Segment>
                    </Grid.Column>
                    </Grid.Row>
                    {/* Bookmark Group */}
                    
                    
              </Grid>
              
            </div>
            


        </div>
        )

    }

}

export default ProfileContainer