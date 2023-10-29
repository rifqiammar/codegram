import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../actions/usersAction";
import Navbar from "../Navbar";

const Profile = () => {
  const { getOneUserResult, getOneUserLoading, getOneUserError } = useSelector((state) => state.UsersReducer);

  const dispatch = useDispatch();

  function getTime(time) {
    const split = time.split("T");
    let dates = split[0].split("-");
    const year = dates[0];
    const month = dates[1];
    const day = dates[2];

    const date = new Date(0, month - 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });

    return `${monthName}, ${day} ${year}`;
  }

  useEffect(() => {
    // Panggil Action get All Posts
    const token = localStorage.getItem("token");
    dispatch(getOneUser(token));
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {getOneUserResult ? (
            getOneUserResult.data.posts.map((e) => {
              return (
                <div key={e.id} className="col">
                  <a href={`/${getOneUserResult.data.username}`} class="link-underline-light link-dark">
                    @{getOneUserResult.data.username}
                  </a>
                  <div className="card-footer text-body-secondary fst-italic " style={{ fontSize: "13px" }}>
                    posted: {getTime(e.createdAt)}
                  </div>
                  <div class="card" style={{ width: "18rem" }}>
                    <img src={e.img_content} class="card-img-top" alt="images" />
                    <div class="card-body"></div>
                  </div>
                </div>
              );
            })
          ) : getOneUserLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getOneUserError ? getOneUserError : "Data Kosong"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
