import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";

export const GET_ONE_USER = "GET_ONE_USER";

export const getOneUser = (token) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_ONE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // get Api

      const response = await axios.get("http://localhost:3050/users/oneuser", {
        headers: {
          Authorization: token,
        },
      });

      //   berhasil get api
      dispatch({
        type: GET_ONE_USER,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      // gagal get api
      dispatch({
        type: GET_ONE_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};
