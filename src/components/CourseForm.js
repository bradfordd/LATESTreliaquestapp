import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";
//import e from "express";

const Table = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course._id}</td>
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
      course_id: "",
      //id: "",
      courses: [],
      table: [],
      errors: {},
    };
  }

  schema = {
    course_id: Joi.string().required().label("Course name"),
  };

  /*componentDidMount() {
    this.setState({
      courses: ["Test course"],
      course_id: "test course                  ",
    });
  }*/

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
      .post(
        "http://localhost:8080/components/course/allCoursesStudentDoesntHave",
        body
      )
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map(course => course._id),
            course_id: response.data[0]._id,
            //id: response.data._id,
          });
        }
        //console.log(response.data[0].name);
      })
      .catch(error => {
        console.log(error);
      });

    ///////////////////////////////////

    axios
      .get("http://localhost:8080/components/course/allcourses")
      .then(response => {
        this.setState({ table: response.data });
        console.log(response.data);
        console.log(this.state.table);
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
      course_id: e.target.value,
    });
    console.log(this.state.course_id);
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
      courseID: this.state.course_id,
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

    var body_2 = {
      grade: 100,
      courseID: this.state.course_id,
      studentID: studentID,
    };

    console.log(body.courseID);
    console.log(body.grade);
    console.log(body.studentID);

    axios
      .post("http://localhost:8080/components/gradeaverage/", body_2)
      .then(response => {
        console.log(response.data);
      });

    window.location = "/components/courses";
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Register for a Course </h1>
        <form onSubmit={this.doSubmit}>
          <div className="form-group">
            <label>Select a course </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.course_id}
              onChange={this.onChangeCourse}
            >
              {this.state.courses.map(function (course_id) {
                return (
                  <option key={course_id} value={course_id}>
                    {course_id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Register for course"
              className="btn btn-primary"
            />
          </div>
        </form>

        <div className="wrapper">
          <h2>Reference</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Course ID</th>
              </tr>
            </thead>
            <tbody>{this.tableList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

// {this.renderInput("course_id", "Course Name")}

/*<div>
            <input
              type="submit"
              value="Register for Course"
              className="btn btn-primary"
            />
          </div>*/
