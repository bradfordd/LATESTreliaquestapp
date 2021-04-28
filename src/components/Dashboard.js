import React, { Component } from "react";
import Form from "./Form";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{/*this.renderButton("View Course")*/}</td>
  </tr>
);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);

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
        console.log(this.state.courses[1]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse}
          //renderButton={this.renderButton}
          key={currentcourse._id}
        />
      );
    });
  }

  renderButton(label) {
    return (
      <button className="btn btn-primary btn-toolbar mb-3">{label}</button>
    );
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
