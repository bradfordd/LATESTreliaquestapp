// useState is the API to hold the state of the user.
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Academic_Records from "./components/Academic_Records";
import Courses from "./components/Courses";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Logout from "./components/logout";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Personal_info from "./components/Personal_info";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/components/login" exact component={LoginForm} />
            <Route path="/components/logout" exact component={Logout} />
            <Route path="/components/register" exact component={RegisterForm} />
            <Route path="/components/about" exact component={About} />
            <Route path="/components/dashboard" exact component={Dashboard} />
            <Route
              path="/components/personalinfo"
              exact
              component={Personal_info}
            />
            <Route path="/components/courses" exact component={Courses} />
            <Route
              path="/components/academicrecords"
              exact
              component={Academic_Records}
            />

            <Redirect from="/" exact to="/" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

const linkStyle = {
  color: "black",
};

/*function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
} */

/*
 <Route path="/student" exact component={Home} />

          <Route path="/dashboard" exact component={Dashboard} />

          <Route path="/preferences" exact component={Preferences} />

          <Route path="/personal information" exact component={Personal_info} />

          <Route path="/courses" exact component={Courses} />

          <Route path="/academic records" exact component={Academic_Records} /> 
          
          
          const Home = () => (
  <div className="wrapper">
    <h1>Welcome to the student view!</h1>
    <ul>
      <Link style={linkStyle} to="/personal information">
        <li>Personal Information</li>
      </Link>
      <Link style={linkStyle} to="/courses">
        <li>Courses</li>
      </Link>
      <Link style={linkStyle} to="/Academic Records">
        <li>Academic Records</li>
      </Link>
    </ul>
  </div>
);*/
