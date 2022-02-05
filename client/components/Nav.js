import React from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { selectButton, clearStudent, clearCampus } from "../store";


const Nav = (props) => {
  const campus_length = props.campuses.length
  const student_length = props.students.length
  return (
    <nav className = "nav-wrapper">
      <div className="container">
          <NavLink 
            exact to='/'
            activeClassName = "current"
            className= 'navlink'
            > 
            Students ({student_length})
          </NavLink>
          <NavLink
            exact to='/campuses'
            activeClassName = "current"
            className = 'navlink'
            >
            Campuses ({campus_length})
          </NavLink>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectButton: (val) => dispatch(selectButton(val)),
    clearStudent: () => dispatch(clearStudent()),
    clearCampus: () => dispatch(clearCampus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);