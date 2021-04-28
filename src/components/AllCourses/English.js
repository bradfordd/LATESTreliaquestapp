import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>grade here</td>
    <td>
      <button
        onClick={() => props.updateGrade(props.course._id)}
        className="btn btn-danger"
      >
        Update Grade
      </button>
    </td>
    <td>{props.course._id}</td>
  </tr>
);

export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.updateGrade = this.updateGrade.bind(this);

    this.state = { courses: [] };
  }

  componentDidMount() {
    localStorage.removeItem("targetID");
    var courseID = localStorage.getItem("courseID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = courseID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    courseID = anotherTempStudentID;
    var body = {
      courseID: courseID,
    };
    axios
      .post("http://localhost:8080/components/course/studentsInCourse", body)
      .then(response => {
        this.setState({ courses: response.data });
        console.log(this.state.courses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateGrade(id) {
    console.log(id);
    localStorage.setItem("targetID", JSON.stringify(id));
    window.location = "/components/allcourses/updategradeform";
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse[0]}
          updateGrade={this.updateGrade}
          key={currentcourse[0]._id}
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
          <h2>Students Enrolled in English</h2>
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
