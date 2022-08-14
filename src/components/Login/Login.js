import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../Firebase/Firebase";
// import { auth } from './fireBase';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //firebase

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    //firebase
    // auth.createUserWithEmailPassword(email, password).then((auth)=>{
    //   console.log(auth)
    // }).catch(error => alert(error.message))

    auth.createUserWithEmailAndPassword(email, password).then((auth) => {
      if (auth) {
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad-logo-vector.svg/1280px-Wattpad-logo-vector.svg.png"
        />
      </Link>

      <div className="loginContainer">
        <h1 className="heading1">Sign In</h1>
        <form>
          <p className="heading5">Email</p>
          <input
            className="inputType"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            type="Email"
          />

          <p className="heading5">Password</p>
          <input
            className="inputType"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            type="Email"
          />

          <button className="loginButton" onClick={signIn}>
            SIGN IN
          </button>

          <p className="paragraph">
            By signing in you agree to all terms and conditions.
          </p>

          <button className="Registerbutton" onClick={register}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
