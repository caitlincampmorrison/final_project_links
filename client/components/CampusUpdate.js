import React, {Component} from "react"
import { connect } from "react-redux"
import { updateCampus } from "../store"

class CampusUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campusName: props.campus.name,
            address: props.campus.address,
            description: props.campus.description
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    handleSubmit (ev) {
        ev.preventDefault()
        const { campusName, address, description } = this.state
        console.log(campusName)
        console.log(this.props.campus.id)
        this.props.updateCampus({id: this.props.campus.id, campusName, address, description})
    }
    render(){
        const {campus} = this.props
        const {campusName, address, description} = this.state
        const { handleChange, handleSubmit} = this

        return (
            <form id="campus-update-form" onSubmit={handleSubmit}>
                 <input 
                    name='campusName' 
                    placeholder="name"
                    onChange={handleChange} 
                    value={campusName} 
                 />
                 <input 
                    name="address" 
                    placeholder="address"
                    onChange={handleChange} 
                    value={address}
                />
                 <input 
                    name="description" 
                    placeholder="description"
                    onChange={handleChange} 
                    value={description}
                />   
                 <button type='submit'> update </button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateCampus: (campus) => dispatch(updateCampus(campus))
    }
}

export default connect(null, mapDispatchToProps)(CampusUpdate)