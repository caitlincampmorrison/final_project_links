import React, {Component} from "react"
import { connect } from "react-redux"
import { updateCampus, selectedCampus } from "../store"
import { Link } from 'react-router-dom';


class CampusUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campusName: props.selectedCampus.name,
            address: props.selectedCampus.address,
            description: props.selectedCampus.description
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
        console.log(this.props.selectedCampus.id)
        this.props.updateCampus({id: this.props.selectedCampus.id, campusName, address, description})
    }
    render(){
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
const mapStateToProps = (state) => {
    return {
        selectedCampus: state.selectedCampus,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateCampus: (campus) => dispatch(updateCampus(campus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusUpdate)