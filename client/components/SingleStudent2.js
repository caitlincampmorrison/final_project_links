import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import StudentUpdate from "./StudentUpdate";

class SingleStudent extends React.Component{
    render(){
      const student = this.props.students.filter((s) => 
            s.id === this.props.match.params.id * 1
      )[0] || {};
      let campus = "no where"
      if(student.campus_name){
        campus = this.props.campuses.filter(c => c.name === student.campus_name)
      }
      console.log("CAMPUS0: ",campus[0])
      return (
        <div className="student-details"> 
            <img id="student-image"src={student.imageUrl} />
            <h1>{student.first_name} {student.last_name}</h1>
            {student.first_name} goes to <Link to={`/campuses/${campus[0].id}`}>
              {student.campus_name} 
            </Link> with a {student.gpa} gpa
            <hr></hr>
            <StudentUpdate student={student}/>
        </div>
       )  
    }
    
}

const mapStateToProps = (state) => {
    return {
      campuses: state.campuses,
      students: state.students,
    };
};

  
  export default connect(mapStateToProps, null)(SingleStudent);