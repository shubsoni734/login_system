import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import "./Styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();

    try {
      if (name == "" || email == "" || mobile == "" || password == "") {
        setMessage("Every field is required");
      }
      axios
        .post("http://127.0.0.1:8080/api/v1/Auth/register", {
          name,
          email,
          password,
          mobile,
        })
        .then((res) => {
          if (res.data.message == "Register Succes fuly") {
            history("/home");
          } else if (res.data.message == "user already exist") {
            setMessage("Alredy Register !");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bodys">
      <Layout>
        <div className="container">
          <div className="formStyle">
            <form className="text-center">
              <h2 className="heading">Register</h2>
              <br />
              <lable>Name : </lable>
              <input
                required
                className="inputStyle"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" Enter your Name"
              />
              <br />
              <lable>Email : </lable>
              <input
                required
                className="inputStyle"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" Enter your Name"
              />
              <br />
              <lable>Mobile No. : </lable>
              <input
                required
                className="inputStyle"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder=" Enter your Name"
              />
              <br />
              <lable>password : </lable>
              <input
                required
                className="inputStyle"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" Enter your Name"
              />
              <p>{message}</p>
              <br />
              <button className="btnStyle" onClick={submit}>
                Registers
              </button>
            </form>
            <button className="btnStyle">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to="/"
              >
                Go to Login
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
