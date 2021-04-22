import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course.teacherAssigned}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.course._id);
        }}
      >
        Drop Course
      </a>
    </td>
  </tr>
);

export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = { courses: [], s_id: "", c_id: "" };
  }

  componentDidMount() {
    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";
    //console.log(studentID);
    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;
    var body = {
      studentID: studentID,
    };
    axios
      .post("http://localhost:8080/components/course/studentcourses", body)
      .then(response => {
        this.setState({ courses: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCourse() {
    /*const studentID_ = localStorage.getItem("studentID");
    const msg = {
      s_id: studentID_,
      c_id: this.state.courses._id,
    };
    axios
      .delete("http://localhost:5000/components/register/courses", msg) ////////////////// It needs to remove a course from a student, not a student from a course
      .then(response => {
        //console.log(response.data);
      });

    this.setState({
      courses: this.state.courses.filter(el => el._id !== msg.c_id),
    });*/
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse[0]}
          deleteExercise={this.deleteExercise}
          key={currentcourse[0]._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h2>Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Instructor Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.courseList()}</tbody>
        </table>
      </div>
    );
  }
}
