import {Router} from "express";
import UsersController from "../controllers/users.controller";
import {BaseRoutes, RouteConfig} from "./BaseRoutes";

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
