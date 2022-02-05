import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

//ACTION TYPES
const FETCH_STUDENTS_FROM_SERVER = "FETCH_STUDENTS_FROM_SERVER"
const FETCH_CAMPUSES_FROM_SERVER = "FETCH_CAMPUSES_FROM_SERVER"
const CREATE_CAMPUS = "CREATE_CAMPUS"
const CREATE_STUDENT = "CREATE_STUDENT"
const DELETE_STUDENT = "DELETE_STUDENT"
const DELETE_CAMPUS = "DELETE_CAMPUS"
const UPDATE_CAMPUS = "UPDATE_CAMPUS"
const UPDATE_STUDENT = "UPDATE_STUDENT"
const GET_ATTENDEES = "GET_ATTENDEES"
const UNREGISTER_STUDENT = "UNREGISTER_STUDENT"
const UPDATE_CAMPUS_FILTER = "UPDATE_CAMPUS_FILTER"
const UPDATE_STUDENT_SORT = "UPDATE_STUDENT_SORT"

//ACTION CREATORS
export const getAttendees = (campus) => ({
    type: GET_ATTENDEES,
    campus
})

export const updateCampusFilter = (number) => ({
    type: UPDATE_CAMPUS_FILTER,
    number
})
export const updateStudentSort = (student_sort) => ({
    type: UPDATE_STUDENT_SORT,
    student_sort
})

//THUNK ACTION CREATORS
export const fetchStudentsFromServer = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/students");
      dispatch({ type: FETCH_STUDENTS_FROM_SERVER, students: data });
    };
};

export const fetchCampusesFromServer = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/campuses");
      dispatch({ type: FETCH_CAMPUSES_FROM_SERVER, campuses: data });
    };
};

export const createCampus = ( campus ) => {
    return async (dispatch) => {
        const { data } = await axios.post('/api/campuses', campus )
        dispatch(fetchCampusesFromServer())
    }
}

export const createStudent = ( student ) => {
    return async (dispatch) => {
        const { data } = await axios.post('/api/students', student )
        dispatch(fetchStudentsFromServer())
    }
}

export const deleteStudent = (student) => {
    console.log("delete student: " + student.first_name)
    return async (dispatch) => {
      const studentId = student.id
      const data = await axios.delete(`/api/students/${student.id}`);
      dispatch({ type: DELETE_STUDENT, student: student.id })
      dispatch(fetchStudentsFromServer())
    };
}

export const deleteCampus = (campus) => {
    console.log("delete campus: " + campus.name, campus.id)
    return async (dispatch) => {
      const campusId = campus.id
      const data = await axios.delete(`/api/campuses/${campus.id}`);
      dispatch({ type: DELETE_CAMPUS, campus: campus.id })
      dispatch(fetchCampusesFromServer())
    };
}

export const updateCampus = (campus) => {
    console.log("UPDATE CAMPUS: " + campus.id, campus.name, campus.address, campus.description)
    return async (dispatch) => {
        campus = (await axios.put(`/api/campuses/${campus.id}`, campus)).data
        //const { data } = await axios.put(`/api/campuses/${campus.id}`, {campus})
        dispatch({type: UPDATE_CAMPUS, campus: campus})
        dispatch(fetchCampusesFromServer())
        dispatch(fetchStudentsFromServer())
    }
}

export const updateStudent = (student) => {
    console.log("UPDATE STUDENT: " + student.id, student.first_name, student.last_name, student.campus_name)
    return async (dispatch) => {
        student = (await axios.put(`/api/students/${student.id}`, student)).data
        //const { data } = await axios.put(`/api/campuses/${campus.id}`, {campus})
        dispatch({type: UPDATE_STUDENT, student: student})
        dispatch(fetchStudentsFromServer())
        //dispatch(fetchCampusesFromServer())
    }
}

export const unregisterStudent = (student) => {
    return async (dispatch) => {
        student.campus_name = ''
        student = (await axios.put(`/api/students/${student.id}`, student)).data
       // dispatch({type: UNREGISTER_STUDENT, student: student.id})
        dispatch(fetchStudentsFromServer())
       // dispatch(fetchCampusesFromServer())
    }
}

//INITIAL STATE
const initialState = {
    campuses: [],
    students: [],
    attendees: [],
    campus_filter: 0,
    student_sort: {student_sort: "name"}
};

//REDUCER
const reducer = ( state = initialState, action) => {

    switch(action.type) {
        case FETCH_CAMPUSES_FROM_SERVER:
            return { ...state, campuses: action.campuses}
        case FETCH_STUDENTS_FROM_SERVER:
            return { ...state, students: action.students}
        case CREATE_CAMPUS:
            return { ...state, campuses:[...state.campuses, action.campuses]}
        case CREATE_STUDENT:
            return { ...state, student:[ ...state.students, action.students]}
        case DELETE_STUDENT:
            return { ...state, students: state.students.filter((student)=>student.id !== action.student)}
        case DELETE_CAMPUS:
            return { ...state, campuses: state.campuses.filter((campus)=>campus.id !== action.campus)}
        case UPDATE_CAMPUS:
            return { ...state, campus: action.campus}
        case UPDATE_STUDENT:
            return { ...state, student: action.student}
        case GET_ATTENDEES:
            let students = []
            students.filter(student => {
                student.campus_name === campus.name
                console.log(student.campus_name === campus.name)
                console.log(student.campus_name)
                console.log(campus.name)
                }).map(student => {
                <p>{student}</p>
                console.log(">>> " + student)
            })
        case UNREGISTER_STUDENT:
            return { ...state, student: action.student}
        case UPDATE_CAMPUS_FILTER:
            return { ...state, campus_filter: action.number}
        case UPDATE_STUDENT_SORT:
            return { ...state, student_sort: action.student_sort}
        default: 
            return state
    }
}

//STORE
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))

export default store