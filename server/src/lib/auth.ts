import passport from "passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {db} from "./db";
import jwt from "jsonwebtoken";
import {Application} from "express";
import {JWT_SECRET} from "./env";
import session from "express-session";

declare module "passport" {
  namespace Express {
    interface User {
      id: string
    }
  }
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const authStrategy = new Strategy(opts, async ({id}, done) => {
  try {
    const user = await db.user.findUnique({
      where: {id}
    })
    if (user) return done(null, user);
  } catch (error) {
    return done(error);
  }
})

function signToken(id: string) {
  return jwt.sign(
    {id},
    JWT_SECRET,
    {expiresIn: "1d"}
  )
}

export class ApiAuth {
  constructor(private readonly app: Application) {
    this.configure()
  }

  private configure() {
    this.app.use(session({
      secret: JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(authStrategy);

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
      try {
        const user = await db.user.findUniqueOrThrow({
          select: {id: true},
          where: {id}
        });
        done(null, {id: user.id});
      } catch (e) {
        done(e)
      }
    });


    this.app.post("/register", async (req, res) => {
      try {
        const {name, email, password, role, phone} = req.body;
        const user = await db.user.create({
          data: {
            name,
            email,
            password,
            role,
            phone,
          }
        });

        return res.status(201).json({
          email,
          id: user.id,
        });
      } catch (error) {
        res.status(400).json({
          message: (error as Error).message
        })
      }
    });

    this.app.post("/login", async (req, res, next) => {
      try {
        const {email, password} = req.body;
        const user = await db.user.findUnique({
          where: {email}
        });

        if (!user) {
          return res
            .status(400)
            .json({message: "user does not exist"});
        }

        if (user.password !== password) {
          return res
            .status(400)
            .json({message: "incorrect password"});
        }

        return res
          .status(200)
          .json({accessToken: signToken(user.id)});
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  }
}
