import React from 'react'
import kobe from '../images/kobe.jpg'
import mj from '../images/mj.jpg'
import james from '../images/james.jpg'




function HomeText() {
    return(
       <div>
           <h2 style={{color: "white"}}>Thank you for visiting our web page!</h2>
           <div className="home">
            <img src={kobe} style={{height: '99rem', width: '103rem'}}></img>
            <img src={mj} style={{height: '88rem', width: '103rem'}}></img>
            <img src={james} style={{height: '68rem', width: '103rem'}}></img>
         </div>
         </div>
    )
}

export default HomeText