import { Express } from "express";
import { UserRoute } from "./user.route";
export const SetupRoutes = (app: Express) => {
  app.use("/v1", UserRoute);
};
