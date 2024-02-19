import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authCheck } from "../helper/authcheck";

const UserRoute = Router();

UserRoute.post("/login", authCheck, UserController.Login);
UserRoute.get("/me/texts", UserController.getTexts);
UserRoute.post("/text", UserController.createText);
UserRoute.patch("/texts/:id", UserController.updateTexts);

export { UserRoute };
