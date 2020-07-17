import React from 'react'
import Result from './Result'
import './MediaResult.css'


class MediaResult extends React.Component {

    render(){
        
        return(
            <div>
                <div>
                {this.props.results.map( r => <Result key={r.id} result={r} /> )}
                

                </div>
            </div>

        )

    }

}

export default MediaResult