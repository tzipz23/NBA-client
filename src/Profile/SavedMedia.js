import React from 'react'


class SavedMedia extends React.Component {

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

    cleanListingsData = () => {
        let listingObj = {}

        this.state.listings.forEach(l => {
            if (listingObj[l.city])
               { listingObj[l.city] += 1}
            else
               { listingObj[l.city] = 1}
        })

        let list_array = Object.entries(listingObj).map( l => {
            return {city: l[0], count: l[1] }
        })
        return list_array
    }
    

    render(){
        // let listingsData = []
        // let tagsData = []
        // this.state.listings.length > 0 ? (listingsData = this.cleanListingsData()) : (listingsData = [])
        
        return(
        <div>
            
        </div>
        )

    }

}

export default SavedMedia