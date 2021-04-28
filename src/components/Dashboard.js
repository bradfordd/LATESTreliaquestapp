import React, { Component } from "react";
import Form from "./Form";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>
      <button
        onClick={() => props.navigateToCourse(props.course.name)}
        className="btn btn-danger"
      >
        View Course
      </button>
    </td>
  </tr>
);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.navigateToCourse = this.navigateToCourse.bind(this);

    this.state = { courses: [] };
  }
  teacherID;
  componentDidMount() {
    var teacherID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = teacherID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    teacherID = anotherTempStudentID;
    var body = {
      teacherID: teacherID,
    };
    axios
      .post("http://localhost:8080/components/course/teachercourses", body)
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
      return (
        <Course
          course={currentcourse[0]}
          navigateToCourse={this.navigateToCourse}
          key={currentcourse[0]._id}
        />
      );
    });
  }

  navigateToCourse(name_of_course) {
    console.log(name_of_course);

    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
    if (name_of_course === "English") {
      console.log("English page!");
      window.location = "/components/about";
    }
  }

  render() {
    if (this.state.courses.length === 0)
      return <p>You are currently not enrolled to any courses.</p>;

    return (
      <React.Fragment>
        <div className="wrapper">
          <h2>Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
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

/*
render() {
  const { permission } = this.props;
  console.log(this.props.permission);
  return (
    <div className="wrapper">
      <h1>Welcome to the Dashboard!</h1>
      <div>
        {permission === "false" && (
          <Link to="/components/personalinfo">
            {this.renderButton("Personal Information")}
          </Link>
        )}
        <Link to="/components/courses">{this.renderButton("Courses")}</Link>
        <Link to="/components/academicrecords">
          {this.renderButton("Academic Records")}
        </Link>
      </div>
    </div>
  );
}
}*/
