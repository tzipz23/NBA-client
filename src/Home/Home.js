import React from 'react'

import HomeText from './HomeText'
import VideoContainer from './VideoContainer'
import './Home.css'

class Home extends React.Component {

    render(){
        return(
            <div className='Home'>
                <VideoContainer />
                <HomeText />
            </div>
        )
    }

}

export default Home;