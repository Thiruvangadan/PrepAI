import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";

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

export default authRoute;
