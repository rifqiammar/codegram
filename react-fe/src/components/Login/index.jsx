import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle error
  const [msg, setMsg] = useState("");

  // Redirect
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    // Agar ketika di submit pagenya tidak reload
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3050/auth/login", {
        username,
        password,
      });

      const token = response.data.refreshToken;
      // Set Local Storage
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      if (error.response) setMsg(error.response.data.error);
    }
  };

  return (
    <div className="container bg-body-tertiary">
      <div className="row position-absolute top-50 start-50 translate-middle bg-body-tertiary">
        <p className="fw-semibold text-danger">{msg}</p>

        <form onSubmit={LoginHandler}>
          <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control fw-semibold" placeholder="@username" required />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control fw-semibold" placeholder="***" required />
          </div>

          <button type="submit" className="btn btn-outline-dark fw-bolder float-end">
            Submit
          </button>
        </form>
        <div id="emailHelp" class="form-text">
          Jika belum memiliki akun silahkan <a href="/register"> registrasi </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
