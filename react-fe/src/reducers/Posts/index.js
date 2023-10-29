import { GET_ALL_POSTS, ADD_POST, getAllPosts } from "../../actions/postsAction";

const initialState = {
  getAllPostsResult: false,
  getAllPostsLoading: false,
  getAllPostsError: false,

  // addPostResult: false,
  // addPostLoading: false,
  // addPostError: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        getAllPostsResult: action.payload.data,
        getAllPostsLoading: action.payload.loading,
        getAllPostsError: action.payload.errorMessage,
      };

    // case ADD_POST:
    //   return {
    //     ...state,
    //     addPostResult: action.payload.data,
    //     addPostLoading: action.payload.loading,
    //     addPostError: action.payload.errorMessage,
    //   };

    default:
      return state;
  }
};

export default posts;
