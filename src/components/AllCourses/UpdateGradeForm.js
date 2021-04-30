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
      data: { grade: "" },
      errors: {},
    };
  }
  schema = {
    grade: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("New Grade to be Assigned"),
  };

  onChangeGrade(e) {
    this.setState({
      grade: e.target.value,
    });
  }

  /*componentDidMount() {

  }*/

  doSubmit = async () => {
    var courseID = localStorage.getItem("courseID");
    //var grade = localStorage.getItem("grade");
    var studentID = localStorage.getItem("targetID");
    var tempStudentID = "";
    var anotherTempStudentID = "";
    var grade = this.state.data.grade;

    tempStudentID = courseID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    courseID = anotherTempStudentID;

    /*tempStudentID = grade.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    grade = anotherTempStudentID;*/

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;

    tempStudentID = grade.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    grade = anotherTempStudentID;

    var body = {
      grade: grade,
      courseID: courseID,
      studentID: studentID,
    };

    console.log(body.courseID);
    console.log(body.grade);
    console.log(body.studentID);

    axios
      .post("http://localhost:8080/components/gradeaverage/update", body)
      .then(response => {
        console.log(response.data);
        console.log(body);
      });

    window.location = "/components/dashboard";
  };

  render() {
    return (
      <div>
        <h1>Change Student's Grade </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("grade", "New Grade to be Assigned")}

          {this.renderButton("Update Grade")}
        </form>
      </div>
    );
  }
}
//Update Grade Form
//{this.renderButton("Update")}

/*<div className="form-group">
<input
  type="submit"
  value="Register for course"
  className="btn btn-primary"
/>
</div>*/

/*<div>
        <h3>Update Grade Form</h3>
        <form onSubmit={this.doSubmit}>
          <div className="form-group">
            <label>New Grade to be Assigned</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.grade}
              onChange={this.onChangeGrade}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>*/
