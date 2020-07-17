import React from 'react'



class Result extends React.Component {

    render(){
        let {title, description,urlToImage} =  this.props.result
        return(
            <div className="result">
            <img style={{height: '13rem', width: '19rem'}} alt="profile-news" className="profile-news-image" src={urlToImage} ></img>
            <div className="resultinfo"><h3>Title:  </h3> <span>{title}</span></div> 
             <div className="resultinfo"><h3>Snippet:  </h3> <span>{description}</span></div>
            
             <button className='UA-save-btn' onClick={this.handleSave}>Save</button>
          </div>

        )

    }

}

export default Result