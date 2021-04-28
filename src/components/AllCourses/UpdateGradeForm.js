import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../Form";
import axios from "axios";
import { login } from "../../services/authService";

export default class UpdateGradeForm extends Form {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      data: { new_grade: "" },
      errors: {},
    };
  }
  schema = {
    new_grade: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("New Grade to be Assigned"),
  };

  onChangeUsername(e) {
    this.setState({
      new_grade: e.target.value,
    });
  }

  doSubmit = async () => {
    //window.location = "/components/allcourses/dashboard";
  };

  render() {
    return (
      <div>
        <h1>Update Grade Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("new_grade", "New Grade to be Assigned")}

          {this.renderButton("Update")}
        </form>
      </div>
    );
  }
}
