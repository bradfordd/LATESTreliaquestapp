import React, { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    // localStorage.removeItem("token");
    auth.logout();
    window.location = "/components/login";
  }

  render() {
    return null;
  }
}

export default Logout;
