import axios from "axios";

export const GET_ALL_POSTS = "GET_ALL_POSTS";
// export const ADD_POST = "ADD_POST";

export const getAllPosts = () => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_ALL_POSTS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // get Api
      const response = await axios.get("http://localhost:3050/posts", {
        headers: {
          // Authorization: token,
        },
      });

      //   berhasil get api
      dispatch({
        type: GET_ALL_POSTS,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      // gagal get api
      dispatch({
        type: GET_ALL_POSTS,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

// Add Post
// export const addPost = (data) => {
//   return (dispatch) => {
//     // loading
//     dispatch({
//       type: ADD_POST,
//       payload: {
//         loading: true,
//         data: false,
//         errorMessage: false,
//       },
//     });

//     // Token
//     const token = localStorage.getItem("token");

//     // Get API
//     axios({
//       method: "POST",
//       url: "http://localhost:3050/posts",
//       timeout: 120000,
//       data,
//       headers: {
//         authorization: token,
//       },
//     })
//       .then((response) => {
//         console.log("3. Berhasil dapat Data : ", response);

//         // loading
//         dispatch({
//           type: ADD_POST,
//           payload: {
//             loading: false,
//             data: response.data,
//             errorMessage: false,
//           },
//         });
//       })

//       .catch((error) => {
//         console.log("3. Gagal dapat Data : ", error); //Wajib console.log(jika error)
//         // loading
//         // Gagal Api
//         dispatch({
//           type: ADD_POST,
//           payload: {
//             loading: false,
//             data: false,
//             errorMessage: error.message,
//           },
//         });
//       });
//   };
// };
