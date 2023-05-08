import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { userData } from "../App";
import "./Styles/Home.css";

const Home = () => {
  const { user, setUser } = useContext(userData);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(user.name);

  useEffect(() => {
    if (!user) return;

    setName(user.name);
  }, [user]);

  const updateName = () => {
    axios
      .put("http://127.0.0.1:8080/api/v1/Auth/update", {
        email: user.email,
        name: name,
      })
      .then((res) => {
        var x = { ...user, name: name };
        setUser(x);
        localStorage.setItem("user", JSON.stringify(x));
        setEditable(false);
      });
  };
  const clearlocal = () => {
    localStorage.clear();
  };
  return (
    <div className="bodys">
      <Layout>
        <div className="inner">
          <h2 className="heding">Welcome {user.name}</h2>
          <div className="printValue">
            <label className="lables">Name : </label>
            {!editable && <label className="lables"> {user.name}</label>}
            {editable && (
              <>
                <input
                  style={{
                    width: "250px",
                    marginRight: "10px",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  onClick={updateName}
                  style={{
                    marginTop: "2px",
                    width: "60px",
                    borderRadius: "10px",
                    height: "40px",
                    fontSize: "25px",
                    backgroundColor: "#f00b51",
                  }}
                >
                  Save
                </button>
              </>
            )}
            <br />
            <label className="lables">Email : {user.email}</label>
            <br />
            <label className="lables">Mobile No. :{user.mobile}</label>
            <br />

            <button className="btnstyle" onClick={() => setEditable(true)}>
              Update
            </button>
            <br />
            <button className="btnstyle" onClick={clearlocal}>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Logout
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
