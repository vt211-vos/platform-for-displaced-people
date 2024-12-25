import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import Routes from "../routes";
import {ApiAuth} from "./auth";


export default class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.config();
    new Routes(this.app);
  }

  private config(): void {
    const corsOptions: CorsOptions = {
      origin: "*"
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    
    new ApiAuth(this.app)
  }

  public listen(port: number) {
    this.app
      .listen(port, "localhost", () => {
        console.log(`Server is running on port ${port}.`);
      })
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.log("Error: address already in use");
        } else {
        }
      });
  }
}
