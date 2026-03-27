import { Router } from "express";
import {
  getMeUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller.js";

import authUser from "../middlewares/auth.middleware.js";

const authRoute = Router();

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */

authRoute.post("/register", registerUserController);

/**
 * @route POST api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRoute.post("/login", loginUserController);

/**
 * @route GET api/auth/logout
 * @description Logout user
 * @access Public
 */

authRoute.get("/logout", logoutUserController);

/**
 * @route GET api/auth/get-me
 * @description Get current logged in user details
 * @access Private
 */

authRoute.get("/get-me", authUser, getMeUserController);

export default authRoute;
