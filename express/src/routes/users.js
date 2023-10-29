import { Router } from "express";
import { getUsers, createUser, getUserImg, getOneUser } from "../controllers/usersController.js";
import { uploadProfile } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRoute = Router();

usersRoute.get("/", verifyToken, getUsers);
usersRoute.get("/oneuser", getOneUser);
usersRoute.post("/", uploadProfile.single("profile"), createUser);
usersRoute.get("/img/:imgpathname", getUserImg);

export default usersRoute;
