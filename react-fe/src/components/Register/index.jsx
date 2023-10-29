import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState();
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    formData.append("email", email);
    formData.append("name", name);

    try {
      const response = await axios.post("http://localhost:3050/users", formData);

      console.log(response);
      navigate("/login");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="container bg-body-tertiary">
        <div className="row position-absolute top-50 start-50 translate-middle bg-body-tertiary">
          <p className="fw-semibold text-danger ">{msg}</p>
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
            <div className="mb-3">
              <label for="confPassword" className="form-label">
                confirm Password
              </label>
              <input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="form-control fw-semibold" placeholder="***" required />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">
                Email
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control fw-semibold" placeholder="user@email.com" required />
            </div>
            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control fw-semibold" placeholder="Nama Anda" required />
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupFile01">
                Foto Profile
              </label>
              <input type="file" class="form-control" id="inputGroupFile01" onChange={(e) => setProfile(e.target.files[0])} />
            </div>
            <button type="submit" className="btn btn-outline-dark fw-bolder float-end">
              Submit
            </button>
          </form>
          <div id="emailHelp" class="form-text">
            Jika sudah memiliki akun silahkan <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
