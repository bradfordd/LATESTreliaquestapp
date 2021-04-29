// useState is the API to hold the state of the user.
import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Academic_Records from "./components/Academic_Records";
import Courses from "./components/Courses";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Logout from "./components/logout";
import Dashboard from "./components/Dashboard";
import Personal_info from "./components/Personal_info";
import ProtectedRoute from "./components/protectedRoute";
import auth from "./services/authService";
import ProtectedRoutePermission from "./components/protectedRoutePermission";
import CourseForm from "./components/CourseForm";

import English from "./components/AllCourses/English";
import EnglishHonors2 from "./components/AllCourses/EnglishHonors2";
import Geometry from "./components/AllCourses/Geometry";
import History from "./components/AllCourses/History";
import Math from "./components/AllCourses/Math";
import Science from "./components/AllCourses/Science";
import ScienceHonors from "./components/AllCourses/ScienceHonors";
import UpdateGradeForm from "./components/AllCourses/UpdateGradeForm";

import AllCoursesAdmin from "./components/AdminFolder/AllCoursesAdmin";
import CreateCourseForm from "./components/AdminFolder/CreateCourseForm";
import UpdateCourseForm from "./components/AdminFolder/UpdateCourseForm";
import EnglishAdmin from "./components/AdminFolder/EnglishAdmin";

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  // Gives the current user object
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    //console.log(user);

    const permission = auth.getCurrentUserPermission();
    this.setState({ permission });
    //console.log(permission);

    const admin_status = auth.getAdminStatus();
    this.setState({ admin_status });
    console.log(admin_status);

    /*try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
    */
  }

  render() {
    const { user } = this.state;
    const { permission } = this.state;
    const { admin_status } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          user={user}
          permission={permission}
          admin_status={admin_status}
        />
        <main className="container">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/components/login" exact component={LoginForm} />
            <Route path="/components/register" exact component={RegisterForm} />
            <Route path="/components/about" exact component={About} />
            <Route path="/components/logout" exact component={Logout} />
            <Route
              path="/components/academicrecords"
              render={props => {
                if (permission === "false" && user)
                  return <Academic_Records {...props} />;
                else if (permission === "true") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/allcourses/updategradeform"
              render={props => {
                if (permission === "true" && user)
                  return <UpdateGradeForm {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/dashboard"
              render={props => {
                if (permission === "true" && user)
                  return <Dashboard {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/allcourses/english"
              render={props => {
                if (permission === "true" && user)
                  return <English {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/allcourses/englishhonors2"
              render={props => {
                if (permission === "true" && user)
                  return <EnglishHonors2 {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/allcourses/History"
              render={props => {
                if (permission === "true" && user)
                  return <History {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/allcourses/science"
              render={props => {
                if (permission === "true" && user)
                  return <Science {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/allcourses/sciencehonors"
              render={props => {
                if (permission === "true" && user)
                  return <ScienceHonors {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <Route
              path="/components/allcourses/geometry"
              render={props => {
                if (permission === "true" && user)
                  return <Geometry {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/allcourses/math"
              render={props => {
                if (permission === "true" && user) return <Math {...props} />;
                else if (permission === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/adminfolder/createcourseform"
              render={props => {
                if (permission === "false" && user && admin_status === "true")
                  return <CreateCourseForm {...props} />;
                else if (admin_status === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
              admin_status
            />
            <Route
              path="/components/adminfolder/updatecourseform"
              render={props => {
                if (permission === "false" && user && admin_status === "true")
                  return <UpdateCourseForm {...props} />;
                else if (admin_status === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/adminfolder/englishadmin"
              render={props => {
                if (permission === "false" && user && admin_status === "true")
                  return <EnglishAdmin {...props} />;
                else if (admin_status === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />
            <Route
              path="/components/adminfolder/allcoursesadmin"
              render={props => {
                if (permission === "false" && user && admin_status === "true")
                  return <AllCoursesAdmin {...props} />;
                else if (admin_status === "false") {
                  return <Redirect to="/not-found" />;
                }
              }}
            />

            <ProtectedRoute
              path="/components/personalinfo"
              exact
              component={Personal_info}
            />
            <ProtectedRoute
              path="/components/courses"
              exact
              component={Courses}
            />

            <ProtectedRoute
              path="/components/courseform"
              exact
              component={CourseForm}
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

/*
 */
