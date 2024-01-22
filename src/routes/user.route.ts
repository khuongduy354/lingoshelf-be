import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const UserRoute = Router();

UserRoute.post("/login", UserController.Login);
UserRoute.get("/me/texts", UserController.getTexts);
UserRoute.post("/text", UserController.createText);
UserRoute.patch("/texts/:id", UserController.updateTexts);

export { UserRoute };
