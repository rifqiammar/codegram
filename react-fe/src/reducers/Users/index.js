import { GET_ONE_USER } from "../../actions/usersAction";

const initialState = {
  getOneUserResult: false,
  getOneUserLoading: false,
  getOneUserError: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_USER:
      return {
        ...state,
        getOneUserResult: action.payload.data,
        getOneUserLoading: action.payload.loading,
        getOneUserError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default users;
