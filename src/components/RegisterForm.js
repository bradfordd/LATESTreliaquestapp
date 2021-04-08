//WORK MAINLY ON THIS
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" , address: ""},
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    address: Joi.string().required().label("Address"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderInput("address", "Address")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
