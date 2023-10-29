import { Router } from "express";
import usersRoute from "./users.js";
import postsRoute from "./posts.js";
import authRoute from "./auth.js";

const router = Router();

router.use("/users", usersRoute);
router.use("/posts", postsRoute);
router.use("/auth", authRoute);

export default router;
