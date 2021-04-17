import React, { Component } from "react";
import Form from "./Form";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

class Dashboard extends Component {
  state = {};

  renderButton(label) {
    return (
      <button className="btn btn-primary btn-toolbar mb-3">{label}</button>
    );
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Dashboard!</h1>
        <div>
          <Link to="/components/personalinfo">
            {this.renderButton("Personal Information")}
          </Link>
          <Link to="/components/courses">{this.renderButton("Courses")}</Link>
          <Link to="/components/academicrecords">
            {this.renderButton("Academic Records")}
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
