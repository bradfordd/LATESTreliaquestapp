import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = { courses: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/components/course/names")
      .then(response => {
        this.setState({ courses: response.data });
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
          deleteExercise={this.deleteExercise}
          key={currentcourse._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h2>Courses</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Name</th>
              <th scope="col">Overall Grade</th>
              <th scope="col">Instructor Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button
                  onClick={() => this.handleAdd()}
                  className="btn btn-danger"
                >
                  Add Course
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Courses;
