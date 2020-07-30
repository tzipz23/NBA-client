import React from 'react'
import extLink from '../images/external-link.svg'
import { Segment } from 'semantic-ui-react'




class Result extends React.Component {

    state = {apiDetails: {}}

    // handleSave = () => {

    //     fetch(`http://localhost:3001/article`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({listing: this.props.result})
    //     })
    //     .then( r => r.json())
    //     .then(data => {
    //         this.setState({apiDetails: data.api_data})
    //         console.log(data)
    //     })
    // }

    render(){
        let {title, description,urlToImage,url} =  this.props.result
        return(
            <Segment>
            <div className="result">
            <div className="resultinfo"> <h1>{title}</h1></div> 
            <br />
            <a href = {url}><img style={{height: '14rem', width: '21rem'}} alt="profile-news" className="profile-news-image" src={urlToImage} ></img></a>
             <br />
             <br />
             <div className="resultinfo"> <h3>{description}</h3></div>
             {/* <a href = {url}><img src={extLink} style={{height: '1rem', width: '1rem'}} alt="external link icon" /></a> */}
               
            
             
          </div>
        </Segment>  
        )

    }

}

export default Result