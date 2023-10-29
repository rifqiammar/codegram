import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
// import { addPost } from "../../actions/postsAction";
import { useNavigate } from "react-router-dom";

const Posting = () => {
  //   const { addPostResult, addPostLoading, addPostError } = useSelector((state) => state.PostsReducer);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [content, setImg_content] = useState();
  const [userId, setUserId] = useState(0);
  const [postStatus, setPostStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);
    formData.append("userId", userId);

    const token = localStorage.getItem("token");

    const response = await axios.post("http://localhost:3050/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    console.log(response);
    // dispatch(addPost(formData));
    setPostStatus(true);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setUserId(decode.id);
  }, [postStatus]);

  return (
    <div className="container mt-5 w-50 p-3 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">
              Upload
            </label>
            <input type="file" class="form-control" id="inputGroupFile01" onChange={(event) => setImg_content(event.target.files[0])} name="img_content" />
          </div>
          <div id="emailHelp" className="form-text">
            Masukan Foto / Gambar
          </div>
        </div>
        <div class="input-group">
          <span class="input-group-text">Caption</span>
          <textarea class="form-control" aria-label="With textarea" onChange={(event) => setCaption(event.target.value)} value={caption} name="caption"></textarea>
        </div>

        <button type="submit" className="btn btn-primary float-end mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Posting;
