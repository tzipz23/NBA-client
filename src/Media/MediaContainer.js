import React from 'react'
import MediaResult from './MediaResult'
import './MediaContainer.css'
import { Segment } from 'semantic-ui-react'
import kobe from '../images/kobe.jpg'



class MediaContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            queryDetails: {
                query: "",  
            },
            staticDetails: {
                resultsCount: "10"
                // sortBy: "salary",
               
            },
            apiDetails: {

            },
            results: []
        }
    }

    componentDidMount(){
        this.getSearchResults()
      }

    getSearchResults() {
        fetch('https://newsapi.org/v2/everything?domains=nba.com&apiKey=f03d7f5f7f3a476d9513c558fec1449b', {
            method: 'GET'
        })
        .then( r => r.json() )
        .then( data => {
        //    debugger
            this.setState({results: data.articles})
            
        })
    }
    

    render(){
        
        return(
            <div className='MediaContainer'>
                <Segment>
                    <h1> NBA <img src={'https://media.giphy.com/media/5h5HJRTkYEvT2o6yvJ/giphy.gif'} style={{height: '13rem', width: '16rem'}}></img> News </h1>
                    {/* <Image src={process.env.PUBLIC_URL + '/SPN.png'} centered className="spn-daily-news"/> */}
                </Segment>
                <br />
                <MediaResult results={this.state.results} />

                
            </div>

        )

    }

}

export default MediaContainer