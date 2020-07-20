import React from 'react'
import MediaResult from './MediaResult'
import './MediaContainer.css'


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
            <div>
                <div>
                    <MediaResult results={this.state.results} />

                </div>
            </div>

        )

    }

}

export default MediaContainer