import React from 'react'
import { Card, Image, Button, Header, Modal, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ReactPlayer from "react-player"
// import PlayerCards from './PlayerCards'


class TeamCard extends React.Component {

    state = {
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })


    render(){
        const {id, image, market, name, sport_title, venue} = this.props.team
        return(
        <div>
            <Card onClick={this.handleOpen}>
                    <Image className='emage' src={image} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'></span>
                    </Card.Meta>
                    <Card.Description>
                        Location: {market}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='basketball ball' />
                        League: {sport_title}
                    </Card.Content>
                    
                </Card>
                <Button> <Link to={"/nba/teams/" + name}> {name} Team Page </Link> </Button>
                <Button onClick={() => this.props.favoriteTeam(id, name)}>Favorite Team</Button>
                <Modal 
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                <Modal.Header>Team Details</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='small' src={image} />
                    <Modal.Description>
                        <Header>{name}</Header>
                        <p>Venue: {venue}</p>
                        <p>Market: {market}</p>
                        <p>League: {sport_title}</p>
                        <p><ReactPlayer style={{height: '250px', width: '300px'}}
                                url="https://www.youtube.com/watch?v=DsxxgJTXr8Y"
                            /></p>
                        {/* <Link to={"/nba/teams/" + name}> {name} Team Page</Link> */}
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
           
        </div>
        )

    }

}

export default TeamCard