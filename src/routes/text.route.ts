import { Router } from "express";
import { TextController } from "../controllers/text.controller";
import { authCheckPopulateUser } from "../middleware/authcheck";

const TextRoute = Router();

TextRoute.get("/me/texts", authCheckPopulateUser, TextController.getMyTexts);
TextRoute.delete(
  "/texts/:id",
  authCheckPopulateUser,
  TextController.deleteText
);
TextRoute.post("/text", authCheckPopulateUser, TextController.createText);
TextRoute.patch("/texts/:id", authCheckPopulateUser, TextController.updateText);

export { TextRoute };
