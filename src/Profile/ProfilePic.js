import React from 'react'
import { Button, Label } from 'semantic-ui-react'



class ProfilePic extends React.Component {

    render(){
        
        return(
        <div>
           <Button as='div' labelPosition='right'>
      <Button icon >
      <i class="thumbs up outline icon"></i>
        Like
      </Button>
      <Label as='a' basic pointing='left' color="green">
        2,048
      </Label>
    </Button>
    <Button as='div' labelPosition='left'>
      <Label as='a' basic pointing='right' color="red">
        2,048
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