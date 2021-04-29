import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.studentName}</td>
    <td>{props.course.grade}</td>
    <td>
      <button
        onClick={() => props.cascadeDelete(props.course.studentID)}
        className="btn btn-danger"
      >
        Remove User From The Database
      </button>
    </td>
  </tr>
);

export default class English extends Component {
  constructor(props) {
    super(props);

    this.cascadeDelete = this.cascadeDelete.bind(this);
    //this.showTeachers = this.showTeachers.bind(this);

    this.state = { courses: [], all_courses: [] };
  }

  componentDidMount() {
    localStorage.removeItem("targetID");
    localStorage.removeItem("grade");
    var courseID = localStorage.getItem("courseID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = courseID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    courseID = anotherTempStudentID;
    var body = {
      courseID: courseID,
    };
    console.log(courseID);
    axios
      .put("http://localhost:8080/components/gradeaverage/entireCourse", body)
      .then(response => {
        this.setState({ courses: response.data });
        console.log(this.state.courses);
      })
      .catch(error => {
        console.log(error);
      });

    var body2 = {
      courseID: courseID,
    };

    axios
      .post("http://localhost:8080/components/course/showcourseinfo", body2)
      .then(response => {
        this.setState({ all_courses: response.data });
        console.log(this.state.all_courses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* showTeacher(teacher_id) {
    return this.state.all_courses
  }*/

  cascadeDelete(id) {
    //console.log(id);
    localStorage.setItem("targetID", JSON.stringify(id));

    console.log(id);
    var body3 = {
      studentID: id,
    };
    console.log(body3.studentID);
    axios
      .put("http://localhost:8080/components/register/cascadingDelete", body3)
      .then(response => {
        console.log(response.data);
        console.log(body3);
      });
    //localStorage.setItem("grade", JSON.stringify(grade));

    this.setState({
      courses: this.state.courses.filter(el => el._id !== body3.studentID),
    });

    //window.location = "/components/adminfolder/englishadmin";
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse}
          cascadeDelete={this.cascadeDelete}
          key={currentcourse._id}
        />
      );
    });
  }

  render() {
    if (this.state.courses.length === 0)
      return <p>No students assgned to this course.</p>;

    return (
      <React.Fragment>
        <div className="wrapper">
          <h2>Information About English</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Instructor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.all_courses.teacherAssigned}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="wrapper">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Overall Grade</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{this.courseList()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
