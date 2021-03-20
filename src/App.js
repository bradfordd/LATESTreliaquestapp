// useState is the API to hold the state of the user. https://reactjs.org/docs/hooks-state.html
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //https://reactrouter.com/web/guides/quick-start
import { Link } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Preferences from './components/Preferences';
import useToken from './components/useToken';

import Personal_info from './components/Personal_info';
import Courses from './components/Courses';
import Academic_Records from './components/Academic_Records';




function App() {
  const { token, setToken } = useToken(); //The useToken function defined in ./components/useToken

  // Display Login if the token in question is falsy
  if(!token) {
    return <Login setToken={setToken} />
  }

  // Section that will take care of the routing of pages
  return (
    <BrowserRouter>
      <div className="wrapper">
      <Switch>
       
            <Route path="/" exact component={Home} />
          
            <Route path="/dashboard" exact component={Dashboard} />
              
            <Route path="/preferences" exact component={Preferences}/>

            <Route path="/personal information" exact component={Personal_info}/>

            <Route path="/courses" exact component={Courses}/>

            <Route path="/academic records" exact component={Academic_Records}/>
      
      </Switch>
        
      </div>
    </BrowserRouter>
  );
}

const linkStyle = {
  color: 'black'
} 

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
)

export default App;



/*function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
} */