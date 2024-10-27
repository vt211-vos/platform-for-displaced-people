import {RequestHandler, Router} from "express";

export type RouteConfig = {
  method: "get" | "post" | "put" | "delete" | "patch"
  path: string
  handler: RequestHandler
  middlewares?: RequestHandler[]
}

export class BaseRoutes {
  mapRoutes(router: Router, routes: RouteConfig[]): void {
    for (const {method, path, handler, middlewares = []} of routes) {
      router[method](path, ...middlewares, (req, res, next) => {
        try {
          handler(req, res, next);
        } catch (error) {
          res.status(500).json({
            message: (error as Error).message
          });
        }
      });
    }
  }
}
