import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
//import e from "express";

const Table = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course._id}</td>
    <td>{props.course.teacherAssigned}</td>
    <td>{props.course.teacherID}</td>
  </tr>
);

export default class CourseForm extends Component {
  constructor(props) {
    super(props);

    //this.selectCourse = this.selectCourse.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.tableList = this.tableList.bind(this);

    this.state = {
      course_id: "",
      teacher_id: "",
      courses_ref_id: "",
      courses: [],
      courses_ref: [],
      table: [],
      target_grade: [],
      errors: {},
    };
  }

  schema = {
    course_id: Joi.string().required().label("Target Name"),
    teacher_id: Joi.string().required().label("Target Name"),
  };

  componentDidMount() {
    var studentID = localStorage.getItem("studentID");
    var tempStudentID = "";
    var anotherTempStudentID = "";

    tempStudentID = studentID.replace('"', "");
    anotherTempStudentID = tempStudentID.replace('"', "");
    studentID = anotherTempStudentID;

    axios
      .get("http://localhost:8080/components/course/allcourses")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map(course => course._id),
            course_id: response.data[0]._id,
          });
        }
        console.log("courses:", response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:8080/components/register/teachers")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            table: response.data.map(teacher => teacher._id),
            teacher_id: response.data[0]._id,
          });
        }
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

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

  onChangeCourse(e) {
    console.log(this.state);
    this.setState({
      course_id: e.target.value,
    });
    console.log(this.state.course_id);
  }

  onChangeTeacher(e) {
    console.log(this.state);
    this.setState({
      teacher_id: e.target.value,
    });
    console.log(this.state.teacher_id);
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
    console.log(this.state.course_id);
    console.log(this.state.teacher_id);
    axios
      .post("http://localhost:8080/components/course/assignTeacher", body)
      .then(response => {
        console.log(response.data);
        console.log(body);
      })
      .catch(error => {
        console.log(error);
      });

    //window.location = "/components/adminfolder/updatecourseform";
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Assign Instructor to a Course </h1>
        <form onSubmit={this.doSubmit}>
          <div className="form-group">
            <label>Course Name </label>
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
            <label>Instructor </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.teacher_id}
              onChange={this.onChangeTeacher}
            >
              {this.state.table.map(function (teacher_id) {
                return (
                  <option key={teacher_id} value={teacher_id}>
                    {teacher_id}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Course"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div className="wrapper">
          <h2>References</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Course ID</th>
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
