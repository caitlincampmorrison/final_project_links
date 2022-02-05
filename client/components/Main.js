import { connect } from 'react-redux'
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { fetchCampusesFromServer, fetchStudentsFromServer } from '../store'
import CampusList from './CampusList';
import StudentList from './StudentList';
import Nav from './Nav';
import CampusForm from './CampusForm'
import SingleCampus from './SingleCampus'
import StudentForm from './StudentForm';
import SingleStudent from './SingleStudent2'
import NotFound from './NotFound'

class Main extends React.Component {
  async componentDidMount(){
    this.props.fetchCampusesFromServer()
    this.props.fetchStudentsFromServer()
  }

  render(){
    return (
      <Router>
        <div className="main">
          <Nav />
          <hr></hr>
          <div className = "content">
            <Switch>
              <Route exact path= "/" component={StudentList} />
              <Route exact path="/campuses" component={CampusList} />
              <Route exact path="/campuses/:id" component={SingleCampus}/>
              <Route exact path="/students" component={StudentList} />
              <Route exact path="/students/create" component={StudentForm} />
              <Route exact path="/students/:id" component={SingleStudent}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedButton: state.selectedButton,
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus,
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampusesFromServer: () => dispatch(fetchCampusesFromServer()),
    fetchStudentsFromServer: () => dispatch(fetchStudentsFromServer()),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Main)
