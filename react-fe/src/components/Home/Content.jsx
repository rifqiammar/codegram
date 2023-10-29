import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postsAction";

const Content = () => {
  const { getAllPostsResult, getAllPostsLoading, getAllPostsError } = useSelector((state) => state.PostsReducer);

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
    dispatch(getAllPosts());
    console.log(getAllPostsResult);
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {getAllPostsResult ? (
            getAllPostsResult.data.map((e) => {
              return (
                <div key={e.id} className="col">
                  {
                    <a href={`/${e.id}`} class="link-underline-light link-dark fw-semibold">
                      @{e.user.username}
                    </a>
                  }
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
          ) : getAllPostsLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getAllPostsError ? getAllPostsError : "Data Kosong"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
