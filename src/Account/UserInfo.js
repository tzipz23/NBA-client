import React, { Component } from 'react'



class UserInfo extends Component {

    constructor() {
        super()
        this.state = {
            tags: [],
            tag: "",
            user_id: 0
        }
    }

    // componentDidMount() {
    //     fetch("http://localhost:3001", {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': "application/json",
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     .then(r => r.json())
    //     .then(tag_array => {
    //         this.setState({tags: tag_array})
    //         console.log(tag_array)
    //     })
    // }
 
    

    render() {
        
        return(
            <div>
                <h2>Your Search Tags</h2>
                    <div>
                        
                    </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Create New Tag: 
                            <input type="text"  
                                   placeholder="your new tag" 
                                   name="tag"
                                   value={this.state.tag} 
                                   onChange={this.handleChange} 
                            />       
                        </label>
                        <button type="submit">Create Tag</button>
                    </form>
                </div>

                <h2>Total No of Job Listings Saved:</h2>
                <hr/>
            </div>
        )
    }

}

export default UserInfo