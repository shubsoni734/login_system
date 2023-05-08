import React, { useContext, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Styles/login.css";

import { userData } from "../App";

const Login = () => {
  const { user, setUser } = useContext(userData);

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    try {
      if (email == "" || password == "") {
        setMessage("Every Field is Required");
      }
      axios
        .post("http://127.0.0.1:8080/api/v1/Auth/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.message == "Login SuccesFully") {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            history("/home");
          }
          if (res.data.message == "Email not exist") {
            setMessage("Email not exist");
          }
          if (res.data.message == "password is wrong") {
            setMessage("password is wrong");
          }
        });
    } catch (error) {
      console.log(error);
      setMessage("id and password is wrong");
    }
  }
  return (
    <div className="bodys">
      <Layout>
        <div className="container">
          <div className="formStyle">
            <h2
              style={{
                margin: 0,
              }}
              className="heading"
            >
              Login
            </h2>
            <form>
              <label>Email : </label>
              <input
                required
                className="inputStyle user"
                type="text"
                placeholder="Enter Register Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>Password : </label>
              <input
                required
                className="inputStyle"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <br />
              <p
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                {message}
              </p>
              <br />
              <button className="btnStyle" onClick={submit}>
                Login
              </button>
            </form>
            <button className="btnStyle">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to="/register"
              >
                Register
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
