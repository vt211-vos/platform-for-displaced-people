import {Router} from "express";
import HousesController from "../controllers/reviews.controller";
import {BaseRoutes, RouteConfig} from "./BaseRoutes";
import {authMiddleware} from "../middlewares/auth";
import {UserRole} from "../enums/users";

export class ReviewsRoutes extends BaseRoutes {
  public router = Router();
  private readonly controller = new HousesController();

  constructor() {
    super()

    const routes: RouteConfig[] = [
      {
        path: "/",
        method: "post",
        handler: this.controller.create
      },
      {
        path: "/",
        method: "get",
        handler: this.controller.findAll
      },
      {
        path: "/:id",
        method: "get",
        handler: this.controller.findOne
      },
      {
        path: "/:id",
        method: "put",
        handler: this.controller.update
      },
      {
        path: "/:id",
        method: "delete",
        handler: this.controller.delete
      }
    ]

    this.mapRoutes(this.router, routes);
  }
}
