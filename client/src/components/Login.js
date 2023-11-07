import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Login() {



  return (
    <div>
    <form >
    <label>Email:</label>
    <br />
    <input type="email" id="loginEmail" />
    <br />
    <label>Password:</label>
    <br />
    <input type="password" id="loginPass" />
    <br />
    <input className="loginput" type="submit" value="Login" />
  </form>

  <br />

  <button className="logbutton">Create account</button>

   
    <>
      <h5 className="create-account">CREATE NEW ACCOUNT</h5>
      <br />
      <form >
      <label>Email:</label>
      <br />
      <input type="email" id="newEmail" />
      <br />
      <label>Password:</label>
      <br />
      <input type="password" id="newPass" />
      <br />
      <input className="loginput" type="submit" value="Create" />
      </form>
    </>
    

  <br />
  </div>
  );
}

export default Login;