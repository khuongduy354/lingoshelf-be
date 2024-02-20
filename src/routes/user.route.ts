import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authCheck } from "../middleware/authcheck";

const UserRoute = Router();

UserRoute.post("/login", authCheck, UserController.Login);

export { UserRoute };
