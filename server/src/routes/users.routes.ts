import {Router} from "express";
import UsersController from "../controllers/users.controller";
import {BaseRoutes, RouteConfig} from "./BaseRoutes";
import {authMiddleware, authGetMiddleware} from "../middlewares/auth";
import {UserRole} from "../enums/users";

export class UsersRoutes extends BaseRoutes {
  public router = Router();
  private readonly controller = new UsersController();

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
        handler: this.controller.findAll,
        middlewares: [
          // authMiddleware([UserRole.ADMIN])
        ]
      },
      {
        path: "/",
        method: "patch",
        handler: this.controller.findOne,
        middlewares: [
          authGetMiddleware
        ]
      },
      {
        path: "/:id",
        method: "put",
        handler: this.controller.update
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
