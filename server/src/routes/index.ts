import {Application} from "express";
import {UsersRoutes} from "./users.routes";
import {HousesRoutes} from "./houses.routes";
import {ReviewsRoutes} from "./reviews.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/users", new UsersRoutes().router);
    app.use("/houses", new HousesRoutes().router);
    app.use("/reviews", new ReviewsRoutes().router);
  }
}
