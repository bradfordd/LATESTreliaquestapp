import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.courseName}</td>
    <td>{props.course.grade}</td>
  </tr>
);

export default class Academic_Records extends Component {
  constructor(props) {
    super(props);

    //this.updateGrade = this.updateGrade.bind(this);

    this.state = { courses: [] };
  }

  componentDidMount() {
    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;
    var body = {
      studentID: studentID,
    };

    axios
      .post("http://localhost:8080/components/gradeaverage/singleStudent", body)
      .then(response => {
        this.setState({ courses: response.data });
        //console.log(this.state.courses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return <Course course={currentcourse} key={currentcourse._id} />;
    });
  }

  render() {
    if (this.state.courses.length === 0)
      return <p>Course grades not available.</p>;

    return (
      <React.Fragment>
        <div className="wrapper">
          <h2>Grades for all currently enrolled courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Overall Grade</th>
              </tr>
            </thead>
            <tbody>{this.courseList()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
