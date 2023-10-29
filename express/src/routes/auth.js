import express from "express";
import { refreshToken, login, logout } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.delete("/logout", logout);
authRouter.get("/token", refreshToken);

export default authRouter;
