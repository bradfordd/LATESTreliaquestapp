import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Form from "../Form";
//import e from "express";

const Table = props => (
  <tr>
    <td>{props.course.teacherAssigned}</td>
    <td>{props.course.teacherID}</td>
  </tr>
);

export default class CourseForm extends Form {
  constructor(props) {
    super(props);

    //this.selectCourse = this.selectCourse.bind(this);

    this.onChangeCourse_ = this.onChangeCourse_.bind(this);
    //this.doSubmit = this.doSubmit.bind(this);
    this.tableList = this.tableList.bind(this);

    this.state = {
      data: { course_id_: "" },
      courses_ref: [],
      errors: {},
    };
  }

  schema = {
    course_id_: Joi.string().required().label("Course"),
  };

  onChangeCourse_(e) {
    this.setState({
      course_id_: e.target.value,
    });
  }

  componentDidMount() {
    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;

    ///////////////////////////////////

    axios
      .get("http://localhost:8080/components/course/allcourses")
      .then(response => {
        this.setState({ courses_ref: response.data });
        console.log(this.state.courses_ref);
      })
      .catch(error => {
        console.log(error);
      });
  }

  tableList() {
    return this.state.courses_ref.map(currentcourse => {
      return <Table course={currentcourse} key={currentcourse._id} />;
    });
  }

  doSubmit(e) {
    e.preventDefault(e);

    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;
    //console.log(this.state);

    var body = {
      courseID: this.state.course_id,
      teacherID: this.state.teacher_id,
    };
    axios
      .post("http://localhost:8080/components/course/noTeacher", body)
      .then(response => {
        console.log(response.data);
      });
    //window.location = "/components/adminfolder/updatecourseform";
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Assign Instructor to a Course </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("course_id_", "Course")}
          {this.renderButton("Create Course")}
        </form>

        <div className="wrapper">
          <h2>References</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Instructor Name</th>
                <th scope="col">Instructor ID</th>
              </tr>
            </thead>
            <tbody>{this.tableList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

// {this.renderInput("teacher_id", "Course Name")}

/*<div>
            <input
              type="submit"
              value="Register for Course"
              className="btn btn-primary"
            />
          </div>*/
