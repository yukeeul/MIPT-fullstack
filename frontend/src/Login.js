import React, { useState } from 'react';
import './Login.css';

async function loginUser(credentials) {
 return fetch('http://158.160.54.112:8000/login/', {
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
    document.location.reload()
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p  className="field-name">Username</p>
          <input className="login-input" type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p className="field-name">Password</p>
          <input className="login-input"  type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

