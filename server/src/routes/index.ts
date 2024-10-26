import {Application} from "express";
import {UsersRoutes} from "./users.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/users", new UsersRoutes().router);
  }
}
