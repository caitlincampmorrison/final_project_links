import React, {Component} from "react"
import {connect} from "react-redux"
import { createCampus } from "../store"

const defaultState = {
    campus_name: '',
    address: ''
}

class CampusForm extends React.Component {
    constructor() {
        super()
        this.state = {
            campus_name: '',
            address: ''
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
        const campus = {}
        this.props.createCampus({...this.state})
    }
    render(){
        const {campus_name, address} = this.state
        const { handleChange, handleSubmit} = this

        return (
            <form id="campus-form" onSubmit={handleSubmit}>
                <p>Add Campus</p>
                 <input 
                    name='campus_name' 
                    placeholder="name"
                    onChange={handleChange} 
                    value={campus_name} 
                 />
                 <input 
                    name="address" 
                    placeholder="address"
                    onChange={handleChange} 
                    value={address}/>
                 <button type='submit'> create </button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCampus: (campus) => dispatch(createCampus(campus))
    }
}

export default connect(null, mapDispatchToProps)(CampusForm)