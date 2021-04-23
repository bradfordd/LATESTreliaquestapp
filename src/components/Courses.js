import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course.teacherAssigned}</td>
    <td>
      <button
        onClick={() => props.deleteCourse(props.course._id)}
        className="btn btn-danger"
      >
        Drop Course
      </button>
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

  deleteCourse(id) {
    console.log("This course was deleted");
    var studentID_ = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID_.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID_ = anotherTempStudentID;

    var msg = {
      courseID: id,
      studentID: studentID_,
    };

    axios
      .put("http://localhost:8080/components/register/deletecourses", msg)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      courses: this.state.courses.filter(el => el._id !== msg.courseID),
    });
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse[0]}
          deleteCourse={this.deleteCourse}
          key={currentcourse[0]._id}
        />
      );
    });
  }

  render() {
    if (this.state.courses.length === 0)
      return <p>You are currently not enrolled to any courses.</p>;

    return (
      <React.Fragment>
        <div>
          <Link to="/components/courseform" className="btn btn-primary">
            Register for a course
          </Link>
        </div>
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
      </React.Fragment>
    );
  }
}
