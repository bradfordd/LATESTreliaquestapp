import React, { Component } from "react";

class Courses extends Component {
  state = {};

  handleAdd = () => {};

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
