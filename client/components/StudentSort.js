import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom" //new
import Main from './Main' //new
import {updateStudentSort} from '../store'


class StudentSort extends React.Component {   
    constructor(props) {
        super(props)
        this.state = {
            student_sort: props.student_sort
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange (ev) {
        ev.preventDefault()
        const student_sort = document.getElementById(`student_sort`).value
        console.log("SUBMIT: " + student_sort)
        this.props.updateStudentSort({student_sort})
    }
    render(){ 
        const { handleChange } = this
        const sortOptions = ['name', 'gpa', 'college']
        return (
        <div>
            <select id="student_sort" onChange={handleChange}>
                {sortOptions.map((sortOption) => (
                    <option key={sortOption} value={sortOption}>{sortOption}</option>
                ))}
            </select>   
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        student_sort: state.student_sort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudentSort: (student_sort) => dispatch(updateStudentSort(student_sort))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentSort);