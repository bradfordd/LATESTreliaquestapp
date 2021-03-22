// Component responsible to handle the main page for the user. Servers to handle authentication.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Nav from './Nav';
import '../App.css';

import About from './About';
import Contact from './Contact';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

async function loginUser(credentials) { //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <BrowserRouter>
      <div >
          <Nav />
          <BrowserRouter path= "/about" component={About} />
          <BrowserRouter path= "/contact us!" component={Contact} />
          <div className="login-wrapper">
            
          
            <h1>Home Page</h1>
            <h2>Please Log In</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)} />
              </label>
              <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
              </label>
              <div>
                <button type="log in">Log In</button>
              </div>
            </form>
            <h2>Create an Account</h2>
              <div>
                <button type="create account">Create Account</button>
              </div>
          </div>
        </div>
    </BrowserRouter>  
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};