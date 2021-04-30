import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
//import "../App.css";

const Course = props => (
  <tr>
    <td>{props.course.name}</td>

    <td>
      <button
        onClick={() =>
          props.navigateToCourse(props.course.name, props.course._id)
        }
        className="btn btn-primary"
      >
        View Course
      </button>
    </td>
    <td>
      <button
        onClick={() => props.cascadeDeleteCourse(props.course._id)}
        className="btn btn-danger"
      >
        Cascade Delete Course
      </button>
    </td>
  </tr>
);

/* <td>
      {localStorage.setItem("courseID", JSON.stringify(props.course._id))}
    </td> */

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.navigateToCourse = this.navigateToCourse.bind(this);
    this.cascadeDeleteCourse = this.cascadeDeleteCourse.bind(this);

    this.state = { courses: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/components/course/allcourses")
      .then(response => {
        this.setState({ courses: response.data });
        console.log(this.state.courses);
      });
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return (
        <Course
          course={currentcourse}
          navigateToCourse={this.navigateToCourse}
          key={currentcourse._id}
        />
      );
    });
  }

  cascadeDeleteCourse(id) {
    localStorage.setItem("targetID", JSON.stringify(id));

    console.log(id);
    var body3 = {
      courseID: id,
    };
    console.log(body3.courseID);
    axios
      .put("http://localhost:8080/components/register/cascadingDelete", body3)
      .then(response => {
        console.log(response.data);
        console.log(body3);
      });
    //localStorage.setItem("grade", JSON.stringify(grade));

    this.setState({
      courses: this.state.courses.filter(el => el._id !== body3.studentID),
    });

    //window.location = "/components/adminfolder/englishadmin";
  }

  navigateToCourse(name_of_course, id) {
    console.log(name_of_course);

    if (name_of_course === "English") {
      console.log("English page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/adminfolder/englishadmin";
    } /*else if (name_of_course === "Math") {
      console.log("Math page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/math";
    } else if (name_of_course === "Science") {
      console.log("Science page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/science";
    } else if (name_of_course === "History") {
      console.log("History page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/history";
    } else if (name_of_course === "English II: Honors") {
      console.log("English II Honors page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/englishhonors2";
    } else if (name_of_course === "Science: Honors") {
      console.log("Science Honors page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/sciencehonors";
    } else if (name_of_course === "Geometry") {
      console.log("Geometry page!");
      localStorage.setItem("courseID", JSON.stringify(id));
      window.location = "/components/allcourses/";
    }*/
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
