import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.studentName}</td>
    <td>{props.course.grade}</td>
    <td>
      <button
        onClick={() =>
          props.updateGrade(props.course.studentID, props.course.grade)
        }
        className="btn btn-danger"
      >
        Update Grade
      </button>
    </td>
  </tr>
);

export default class Science extends Component {
  constructor(props) {
    super(props);

    this.updateGrade = this.updateGrade.bind(this);

    this.state = { courses: [] };
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
    axios
      .put("http://localhost:8080/components/gradeaverage/entireCourse", body)
      .then(response => {
        this.setState({ courses: response.data });
        console.log(this.state.courses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateGrade(id, grade) {
    console.log(id);
    localStorage.setItem("targetID", JSON.stringify(id));
    localStorage.setItem("grade", JSON.stringify(grade));
    window.location = "/components/allcourses/updategradeform";
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse}
          updateGrade={this.updateGrade}
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
          <h2>Students Enrolled in Science</h2>
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
