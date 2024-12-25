import {Router} from "express";
import HousesController from "../controllers/houses.controller";
import {BaseRoutes, RouteConfig} from "./BaseRoutes";
import {authMiddleware} from "../middlewares/auth";
import {UserRole} from "../enums/users";

export class HousesRoutes extends BaseRoutes {
  public router = Router();
  private readonly controller = new HousesController();

  constructor() {
    super()

    const routes: RouteConfig[] = [
      {
        path: "/",
        method: "post",
        handler: this.controller.create,
        middlewares: [
          authMiddleware([UserRole.VOLUNTEER])
        ]
      },
      {
        path: "/",
        method: "get",
        handler: this.controller.findAll,
        middlewares: [
          // authMiddleware([UserRole.ADMIN])
        ]
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
