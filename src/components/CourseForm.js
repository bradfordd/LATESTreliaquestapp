import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";
//import e from "express";

class CourseForm extends Form {
  constructor(props) {
    super(props);

    //this.selectCourse = this.selectCourse.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.doSubmit = this.doSubmit.bind(this);

    this.state = {
      course_id: "",
      //id: "",
      courses: [],
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

    /*const course_to_be_added = {
      course_id: this.state
    };*/

    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;
    console.log(this.state);
    /*return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse[0]}
          deleteCourse={this.deleteCourse}
          key={currentcourse[0]._id}
        />
      );
    });*/

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

    window.location = "/courses";
  }

  renderButton_(label) {
    return <button className="btn btn-primary">{label}</button>;
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
      </div>
    );
  }
}

export default CourseForm;

// {this.renderInput("course_id", "Course Name")}

/*<div>
            <input
              type="submit"
              value="Register for Course"
              className="btn btn-primary"
            />
          </div>*/
