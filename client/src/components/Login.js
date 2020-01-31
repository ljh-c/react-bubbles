import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  let history = useHistory();

  const handleChange = evt => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    });
  };

  const login = evt => {
    evt.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/bubbles');
      })
      .catch(err => console.log(err));
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input 
          type="text"
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
          autoFocus
          />
        <input 
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
