import { Express } from "express";
import { UserRoute } from "./user.route";
import { TextRoute } from "./text.route";
export const SetupRoutes = (app: Express) => {
  app.use("/v1", UserRoute);
  app.use("/v1", TextRoute);
};
