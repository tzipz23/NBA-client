import React from 'react'
import ProfilePic from './ProfilePic'
import FavPlayers from './FavPlayers'
import FavTeams from './FavTeams'
import SavedMedia from './SavedMedia'
import {Grid, Image, Icon, Button, Card, Segment, Modal, Header, Form} from 'semantic-ui-react'



class ProfileContainer extends React.Component {

    state = {
        name: this.props.user.name,
        image: this.props.user.image,
        password: "",
        modalEditOpen: false,
        modalDeleteOpen: false,
        
    }

    render(){
        
        return(
        <div>
            < ProfilePic />
            < FavPlayers />
            < FavTeams />
            < SavedMedia />

            <div className="profile profile-background">
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                    <Grid.Column className="profile-user-card">
                            <Segment >
                                <Card className="profile-edit-button" centered="true" fluid="true" raised="false">
                                    {/* <img alt="profile" src={this.props.user.avatar} wrapped ui={false} className="profile-user-image"/> */}
                                    <Card.Content>
                                    <Card.Header>{this.props.user.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{this.props.user.email}</span>
                                    </Card.Meta>
                                    {/* <Card.Description>
                                        {this.props.user.name} loves playing basketball and soccer.
                                    </Card.Description> */}
                                    </Card.Content>
                                    <Card.Content extra>
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
                    <Grid.Column> 
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
                    <Grid.Column>
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
                    
                    <Grid.Row className="profile-row-bookmarks">
                        <div className="padding-bookmarks">
                            {/* {this.state.bookmarks.length === 0 ? */}
                            <Segment>
                            <h1 style={{fontFamily: "Impact"}}> <u>Saved Articles</u> </h1>
                            <br />
                            <Grid>
                                <Grid.Row columns={1}>
                                    <Grid.Column >
                                        {/* <img alt="profile-news" className="profile-news-image" src="" ></img> */}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <h1 style={{fontFamily: "Impact"}}> No Saved Articles</h1>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            </Segment>
                            :
                            <div>
                            {/* {this.state.bookmarks.map(mark => {
                                return(
                                    <div>
                                        
                                    </div>
                                ) 
                            })} */}
                            </div>
                            }
                        </div>
                    </Grid.Row>
              </Grid>
            </div>



        </div>
        )

    }

}

export default ProfileContainer