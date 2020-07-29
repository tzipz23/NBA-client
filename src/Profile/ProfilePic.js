import React from 'react'
import { Button, Label } from 'semantic-ui-react'


class ProfilePic extends React.Component {

    state ={
      like: 0,
      dislike: 0
    }

    incrementValue = () => {
      this.setState({like: this.state.like + 1})
    }

    decrementValue = () => {
      this.setState({dislike: this.state.dislike + 1})
    }

    componentDidMount(){
    //   fetch(`http://localhost:3001/user/${this.props.id}`)
    //  .then(resp => resp.json())
    //  .then(data => {
    //    this.setState({user: data})
    //  })

    
     let {like, dislike} = this.state + 1
     
    }

    render(){
        
        return(
        <div>
           <Button as='div' labelPosition='right'>
      <Button onClick={() => this.incrementValue()} icon >
      <i class="thumbs up outline icon"></i>
        Like
      </Button>
      <Label as='a' basic pointing='left' color="green">
        {this.state.like}
      </Label>
    </Button>
    <Button  onClick={() => this.decrementValue()} as='div' labelPosition='left'>
      <Label as='a' basic pointing='right' color="red">
        {this.state.dislike}
      </Label>
      <Button icon >
      <i class="thumbs down outline icon"></i>
        Dislike
      </Button>
    </Button>
    <Button as='div' labelPosition='left'>
      
    </Button> 
        </div>
        )

    }

}

export default ProfilePic