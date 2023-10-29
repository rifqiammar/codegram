import { Router } from "express";
import { getAllPosts, createPost, getPostImg } from "../controllers/postsController.js";
import { uploadContent } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const postsRoute = Router();

postsRoute.get("/", getAllPosts);
postsRoute.post("/", verifyToken, uploadContent.single("content"), createPost);
postsRoute.get("/img/:imgpathname", getPostImg);

export default postsRoute;
