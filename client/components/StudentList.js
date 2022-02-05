import React from "react"
import {connect} from "react-redux"
import {deleteStudent } from "../store"
import StudentForm from "./StudentForm"
import StudentSort from "./StudentSort"
import { Link } from 'react-router-dom';

const StudentList = ( {students, deleteStudent, student_sort})  => {
    const noattendance = "no schools"
    console.log("CS: " + student_sort.student_sort)
        const sortName = (function(a, b){
            var nameA = a.first_name.toUpperCase(); 
            var nameB = b.first_name.toUpperCase(); 
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0; // names must be equal)
            })
    const sortCollege = (function(a, b){
        if(a.campus_name){
            var collegeA = a.campus_name.toUpperCase();
        }
        else{ var collegeA = 'zzz' }
        if(b.campus_name){
            var collegeB = b.campus_name.toUpperCase(); 
        }
        else{ var collegeB = 'zzzz' }
        if (collegeA < collegeB) { return -1; }
        if (collegeA > collegeB) { return 1; }
        return 0; // names must be equal)
        })
    const sortGpa = (function(a,b){
        if(!a.gpa){
            a.gpa = 0
        }
        if(!b.gpa){
            b.gpa = 0
        }
        return b.gpa - a.gpa; 
    })
     return (      
        <div id="students">
            <StudentSort />
            <hr></hr>
            <div id="students-list">
            {students.sort((student_sort.student_sort === 'college') ? sortCollege :
                (student_sort.student_sort === 'gpa') ? sortGpa : sortName 
            ).map((student) => (
                <p key={student.id}>
                    <Link to={`/students/${student.id}`} className="individual-student">
                        {student.first_name} - attends {student.campus_name ? student.campus_name : noattendance }
                    </Link>
                    <button id="deletebutton" onClick={()=>deleteStudent(student)}>x</button>
                </p>
            ))}
            </div>                
            <StudentForm />
        </div>
     )
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
        student_sort: state.student_sort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (student) => dispatch(deleteStudent(student))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
