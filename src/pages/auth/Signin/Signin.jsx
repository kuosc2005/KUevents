import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Signin.scss";
import { Input } from "../../../components";
import { images } from "../../../constants";
import { authActions } from "../../../store";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (e) => {
    setLoading(true);
    const res = await axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/auth/signin`, {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => setError("Invalid email or password"));

    const data = await res.data;
    setLoading(false);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/"));
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="signin">
      <div className="left">
        <div className="right__container">
          {/* <h1 className="logo">
            KU<span>vents</span>
          </h1> */}
        <Link to="/">
          <img src={images.logo} alt="logo" className="footer__logo" />
         </Link>          
          <button className="go-back" onClick={goBack}>
            <img src={images.goback} alt="Go Back" />
          </button>
          <h1>Sign In to KUvents</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              label="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <button type="submit">
              {loading ? "Signing in..." : "Signin"}
            </button>
          </form>
          {/* <p>Or</p>
          <Link to="/">
            <button className="google__button">
              <img src={images.google} alt="google" />
              <p>Signin with Google</p>
            </button>
          </Link>
          <Link to="/">
            <button className="apple__button">
              <img src={images.apple} alt="apple" />
              <p>Signin with Apple</p>
            </button>
          </Link> */}
        </div>
      </div>

      <div className="right">
        <img src={images.signin_image} alt="signup" />
        <div className="content">
          <h1>Welcome back</h1>
          <p>To keep connected with us provide us with your information</p>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
            }}
          >
            <button>Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
