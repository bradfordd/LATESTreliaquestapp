import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        RQ App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/components/login">
                Login
              </NavLink>

              <NavLink className="nav-item nav-link" to="/components/register">
                Register
              </NavLink>
              <NavLink className="nav-item nav-link" to="/components/about">
                About
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/components/courses">
                Courses
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/components/academicrecords"
              >
                Academic Records
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/components/personalinfo"
              >
                Personal Information
              </NavLink>
              <NavLink className="nav-item nav-link" to="/components/about">
                About
              </NavLink>
              <NavLink className="nav-item nav-link" to="/components/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

/*export default function Nav() {
  return(
    <nav>
        <h3>Logo Here</h3>
        <ul classNameName="nav-NavLinks">
            <li>About</li>
            <li>Contact us!</li>
        </ul>
    </nav>
  );
}
*/

/* <li className="nav-item">
            <NavLink className="nav-NavLink" to="#">
              Pricing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-NavLink disabled" to="#">
              Disabled
            </NavLink>
          </li> */
