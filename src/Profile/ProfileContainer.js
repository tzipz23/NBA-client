import React from 'react'
import ProfilePic from './ProfilePic'
import FavPlayers from './FavPlayers'
import FavTeams from './FavTeams'
import SavedMedia from './SavedMedia'


class ProfileContainer extends React.Component {

    render(){
        
        return(
        <div>
            < ProfilePic />
            < FavPlayers />
            < FavTeams />
            < SavedMedia />

        </div>
        )

    }

}

export default ProfileContainer