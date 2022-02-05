import React from "react"
import { connect } from "react-redux"
import { unregisterStudent } from "../store";
import CampusUpdate from "./CampusUpdate";
import { Link } from "react-router-dom";


class SingleCampus extends React.Component {
   render(){
        const campus = this.props.campuses.filter((c) => 
            c.id === this.props.match.params.id * 1
        )[0] || {};
        const campusstudents = this.props.students.filter(student => {
            return student.campus_name === campus.name
        })
        function findStudentId(name, students ) {
            const student = students.find(student => student.first_name === name)
            return student
        }
        return (
            <div className="campus-details"> 
                <img id="college-image" src={campus.imageUrl} />
                <h2>{campus.name}</h2>
                <ul>
                    <li>Address: {campus.address}</li>
                    <li>Description: {campus.description}</li>
                </ul>                
                <p>Enrollees:</p>
                {(campusstudents.length === 0) ? "no students are currently enrolled here" : 
                    campusstudents.map(student => 
                        <Link to={`/students/${student.id}`} key={student.id} className="individual-student">
                            {student.first_name} 
                            <button id="unregisterbutton" onClick={()=>unregisterStudent(student)}>unregister</button> 
                        </Link>
                    )
                }
                <hr></hr>
                <CampusUpdate />
            </div>
        )
   }
}

const mapStateToProps = (state) => {
    return {
      students: state.students,
      campuses: state.campuses
    };
  };

  const mapDispatchToProps = (dispatch) => {
      return {
          unregisterStudent: (student) => dispatch(unregisterStudent(student)),
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);