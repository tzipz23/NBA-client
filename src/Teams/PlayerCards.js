import React from 'react'
import { Card, Image, Modal, Header, Button } from 'semantic-ui-react'


class ProfileContainer extends React.Component {

    state = {
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    render(){
        const {id, birthdate, college, full_name, height, jersey_number, player_image, weight, position} = this.props.player
        
        return(
        <div>
            <Card onClick={this.handleOpen}>
                    <Image src={player_image} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{full_name} {jersey_number}</Card.Header>
                    <Card.Meta>
                        <span className='date'></span>
                    </Card.Meta>
                    <Card.Description>
                        Position: {position}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    </Card.Content>
                </Card>
                <Button onClick={() => this.props.favoritePlayer(id, full_name)}>Favorite Player</Button>
                <Modal 
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                <Modal.Header>Player Details</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='medium' src={player_image} />
                    <Modal.Description>
                        <Header>{full_name} {jersey_number}</Header>
                        <p>College: {college}</p>
                        {/* <p>Position: {position}</p> */}
                        <p>Height: {height}</p>
                        <p>Weight: {weight}</p>
                        <p>Birthdate: {birthdate}</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
           

        </div>
        )

    }

}

export default ProfileContainer