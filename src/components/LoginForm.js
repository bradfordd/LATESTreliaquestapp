import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";
import { login } from "../services/authService";

class LoginForm extends Form {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      data: { username: "", password: "" },
      errors: {},
    };
  }
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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

  doSubmit = async () => {
    const user = {
      username: this.state.data.username,
      password: this.state.data.password,
    };
    console.log(user);
    axios
      .post("http://localhost:8080/components/auth", user)
      .then(res => console.log(res.data));

    /* const { data } = this.state;
    await login(data.username, data.password);

    console.log(data);*/
  };

  render() {
    return (
      <div>
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

/*
<div>
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={data.passwrod}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          {this.renderButton("Login")}
        </form>
      </div> */
