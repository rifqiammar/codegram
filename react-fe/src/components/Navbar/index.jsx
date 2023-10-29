import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../actions/usersAction";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [logoutStatus, setLogoutStatus] = useState(false);
  const { getOneUserResult, getOneUserLoading, getOneUserError } = useSelector((state) => state.UsersReducer);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Logout
  const logout = async () => {
    await axios.delete("http://localhost:3050/auth/logout");
    localStorage.removeItem("token");
    setLogoutStatus(true);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getOneUser(token));
  }, [dispatch, logoutStatus]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mt-3 mb-5">
      <div className="container">
        <img height="32" width="32" src="https://cdn.simpleicons.org/instagram/#E4405F" className="me-1" />
        <a className="navbar-brand fw-semibold" href="/">
          Codegram
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link active" href="/posting">
              Tambah Posting
            </a>
          </div>
        </div>
        {getOneUserResult ? (
          <div className=" float-end ">
            <img className="profile" src={getOneUserResult.data.profile_img} alt="profile" />
            <a href={`/${getOneUserResult.data.username}`} class="btn  fw-bolder">
              Halo, {getOneUserResult.data.name}
            </a>
            <button onClick={logout} class="ms-4 btn  fw-bolder btn btn-outline-secondary">
              Logout
            </button>
          </div>
        ) : getOneUserLoading ? (
          <p>Loading...</p>
        ) : (
          <div className=" float-end ">
            <a href="/login" class="btn btn-outline-dark fw-bolder ">
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
