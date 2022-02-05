import React from "react"
import {connect} from "react-redux"
import { selectCampus, deleteCampus } from "../store"
import CampusForm from './CampusForm'
import { Link } from "react-router-dom";

const CampusList = ( {campuses, students, selectCampus, deleteCampus, campus_filter})  => {
    let count = 0
    const sortName = (function(a, b){
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0; // names must be equal)
        })
     return (      
        <div id="campuses">
            <div id="campuses-list">
                {campuses.sort(sortName).map((campus) => (
                    <p key={campus.id}>
                    <Link to={`/campuses/${campus.id}`} className="individual-campus">
                        {
                        students.forEach((student) => {
                            if(students.indexOf(student) === 0){
                                count = 0
                            }
                            if(student.campus_name === campus.name){
                                count ++
                            }
                        })}
                        {campus.name} ({count} enrollments)
                    </Link>
                    <button id="deletebutton" onClick={()=>deleteCampus(campus)}>x</button>
                    </p>
                ))}
            </div>
            <CampusForm />
        </div>
     )
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses,
        students: state.students,
        campus_filter: state.campus_filter
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectCampus: (campus) => dispatch(selectCampus(campus)),
        deleteCampus: (campus) => dispatch(deleteCampus(campus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList)
