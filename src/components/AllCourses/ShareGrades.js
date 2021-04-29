import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
//import e from "express";

const Table = props => (
  <tr>
    <td>{props.course.studentName}</td>
    <td>{props.course.courseName}</td>
    <td>{props.course.grade}</td>
  </tr>
);

export default class CourseForm extends Component {
  constructor(props) {
    super(props);

    //this.selectCourse = this.selectCourse.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.tableList = this.tableList.bind(this);

    this.state = {
      target_id: "",
      courses: [],
      table: [],
      errors: {},
    };
  }

  schema = {
    target_id: Joi.string().required().label("Course name"),
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/components/register/students")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map(course => course.name),
            target_id: response.data[0].name,
          });
        }
        //console.log(response.data[0].name);
      })
      .catch(error => {
        console.log(error);
      });

    ///////////////////////////////////

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
      .post(
        "http://localhost:8080/components/gradeaverage/getSharedGrades",
        body
      )
      .then(response => {
        this.setState({ table: response.data });
        console.log(response.data);
        //console.log(this.state.table);
      })
      .catch(error => {
        console.log(error);
      });
  }

  tableList() {
    return this.state.table.map(currentcourse => {
      return <Table course={currentcourse} key={currentcourse._id} />;
    });
  }

  onChangeCourse(e) {
    console.log(this.state);
    this.setState({
      target_id: e.target.value,
    });
    console.log(this.state.target_id);
  }
  doSubmit(e) {
    e.preventDefault(e);

    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;
    console.log(this.state);

    var body = {
      studentID: studentID,
      courseID: this.state.target_id,
      studentIDToShareWith: this.state.target_id,
    };
    console.log("Testing");
    axios
      .post("http://localhost:8080/components/register/courses", body)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    window.location = "/components/courses";
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Share Information With a Classmate! </h1>
        <form onSubmit={this.doSubmit}>
          <div className="form-group">
            <label>Share grade With </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.target_id}
              onChange={this.onChangeCourse}
            >
              {this.state.courses.map(function (target_id) {
                return (
                  <option key={target_id} value={target_id}>
                    {target_id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Share grades"
              className="btn btn-primary"
            />
          </div>
        </form>

        <div className="wrapper">
          <h2>Students' Grades</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Course Name</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>{this.tableList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

// {this.renderInput("target_id", "Course Name")}

/*<div>
            <input
              type="submit"
              value="Register for Course"
              className="btn btn-primary"
            />
          </div>*/
