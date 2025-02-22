import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserLoginContext } from '../components/Navigation'

const Login = () => {
  const [username, setUsername] = useState("hartik");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userLoginContext, setUserLoginContext } = React.useContext(UserLoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    axios.post("http://localhost:8000/api/login", {
      "username": username,
      "password": password,
    })
      .then((res) => {
        if (res.status === 200) {
          alert(`Logged in as ${username}`);
          localStorage.setItem("token", res.data.token);
          console.log("token:", res.data);
          setUserLoginContext(userLoginContext => !userLoginContext);
          navigate("/dashboard");
        }
        else {
          alert("User not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
