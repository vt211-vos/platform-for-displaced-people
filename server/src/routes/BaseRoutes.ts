import {RequestHandler, Router} from "express";

export type RouteConfig = {
  method: "get" | "post" | "put" | "delete" | "patch"
  path: string
  handler: RequestHandler
}

export class BaseRoutes {
  mapRoutes(router: Router, routes: RouteConfig[]): void {
    for (const {method, path, handler} of routes) {
      router[method](path, (req, res, next) => {
        try {
          handler(req, res, next);
        } catch (e) {
          res.status(500).json({
            message: "Internal Server Error!"
          });
        }
      });
    }
  }
}
