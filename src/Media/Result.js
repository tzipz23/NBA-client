import React from 'react'
import extLink from '../images/external-link.svg'
// import { Button } from 'semantic-ui-react'




class Result extends React.Component {

    state = {apiDetails: {}}

    handleSave = () => {

        fetch(`http://localhost:3001/article`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({listing: this.props.result})
        })
        .then( r => r.json())
        .then(data => {
            this.setState({apiDetails: data.api_data})
            console.log(data)
        })
    }

    render(){
        let {title, description,urlToImage,url} =  this.props.result
        return(
            <div className="result">
            <img style={{height: '13rem', width: '19rem'}} alt="profile-news" className="profile-news-image" src={urlToImage} ></img>
            <div className="resultinfo"><h3>Title:  </h3> <span>{title}</span></div> 
             <div className="resultinfo"><h3>Snippet:  </h3> <span>{description}</span></div>
             <a href = {url}><img src={extLink} style={{height: '1rem', width: '1rem'}} alt="external link icon" /></a>
              
            
             
          </div>

        )

    }

}

export default Result