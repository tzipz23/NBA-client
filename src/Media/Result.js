import React from 'react'



class Result extends React.Component {

    render(){
        let {title, snippet} =  this.props.result
        return(
            <div className="result">
            <div className="resultinfo"><h3>Title:  </h3> <span>{title}</span></div> 
             <div className="resultinfo"><h3>Description:  </h3> <span>{snippet}</span></div>
            
             <button className='UA-save-btn' onClick={this.handleSave}>Save</button>
          </div>

        )

    }

}

export default Result