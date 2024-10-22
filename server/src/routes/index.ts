import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/tutorials", tutorialRoutes);
  }
}
