import { combineReducers } from "redux";
import UsersReducer from "./Users";
import PostsReducer from "./Posts";

export default combineReducers({
  UsersReducer,
  PostsReducer,
});
