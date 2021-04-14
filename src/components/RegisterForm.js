//WORK MAINLY ON THIS
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";

class RegisterForm extends Form {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.doSubmit = this.doSubmit.bind(this);

    this.state = {
      data: { username: "", password: "", name: "", address: "" },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    address: Joi.string().required().label("Address"),
  };

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  doSubmit = () => {
    console.log(this.state);

    axios
      .post("http://localhost:8080/components/register", this.state)
      .then(res => console.log(res.data));
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
