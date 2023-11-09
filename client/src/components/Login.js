import React, { useState } from "react";

//add verification of email for signup

function Login({setUser, user}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: loginEmail,
      password: loginPass,
    };
  
    fetch('http://127.0.0.1:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            throw new Error(data.error);
          });
        }
      })
      .then(data => {
        // Handle the successful login response
        console.log(data.message);
  
        // Set the user state with the received user data
        setUser(data.user);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message to the user.
        console.error(error.message);
        // Display the error message to the user
      });
  
  };
  
  function test() {
    console.log(user)
  }
  

  const handleSignup = (e) => {
    e.preventDefault();
    const data = {
      email: newEmail,
      password: newPass,
    };

    fetch('http://127.0.0.1:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          return response.json().then(data => {
            throw new Error(data.error);
          });
        }
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <button id="testbutton" onClick={test}>test</button>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          id="loginEmail"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="loginPass"
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
        />
        <br />
        <input className="loginput" type="submit" value="Login" />
      </form>

      <br />

      <h5 className="create-account">CREATE NEW ACCOUNT</h5>
      <br />
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          id="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="newPass"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <br />
        <input className="loginput" type="submit" value="Create" />
      </form>

      <br />
    </div>
  );
}

export default Login;
