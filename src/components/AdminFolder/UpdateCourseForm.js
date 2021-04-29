import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../Form";
import axios from "axios";
import { login } from "../../services/authService";

export default class UpdateGradeForm extends Form {
  constructor(props) {
    super(props);

    this.onChangeGrade = this.onChangeGrade.bind(this);
    //this.doSubmit = this.doSubmit.bind(this);

    this.state = {
      data: { course: "" },
      errors: {},
    };
  }
  schema = {
    course: Joi.number().required().min(0).max(100).label("New Course"),
  };

  onChangeGrade(e) {
    this.setState({
      course: e.target.value,
    });
  }

  /*componentDidMount() {

  }*/

  doSubmit = async () => {
    var courseID = localStorage.getItem("courseID");
    //var course = localStorage.getItem("course");
    var studentID = localStorage.getItem("targetID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = courseID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    courseID = anotherTempStudentID;

    /*tempStudentID = course.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    course = anotherTempStudentID;*/

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;

    var body = {
      course: this.state.data.course,
      courseID: courseID,
      studentID: studentID,
    };

    console.log(body.courseID);
    console.log(body.course);
    console.log(body.studentID);

    axios
      .post("http://localhost:8080/components/gradeaverage/update", body)
      .then(response => {
        console.log(response.data);
      });

    window.location = "/components/dashboard";
  };

  render() {
    return (
      <div>
        <h1>Course Creation </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("course", "New Course")}

          {this.renderInput("grade", "New Grade to be Assigned")}
          {this.renderInput("grade", "New Grade to be Assigned")}

          {this.renderButton("Create Course")}
        </form>
      </div>
    );
  }
}
