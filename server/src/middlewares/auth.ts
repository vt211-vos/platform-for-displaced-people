import {UserRole} from "../enums/users";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_SECRET} from "../lib/env";

interface Token extends JwtPayload {
  id: string,
  role: UserRole,
}

export interface RequestAuth extends Request {
  user?: any; // Customize this type as per your use case
}

export const authMiddleware = (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization ?? ""
    const data = jwt.verify(token.split('Bearer ')[1], JWT_SECRET) as Token

    if (!roles.includes(data.role)) {
      res
        .status(403)
        .json({message: "Not allowed"})
      return
    }
    next()
  } catch (error) {
    res
      .status(500)
      .json({message: (error as Error).message})
  }
}


export const authGetMiddleware = (req: RequestAuth, res: Response, next: NextFunction) => {
  console.log("authGetMiddleware, authGetMiddleware")

  try {
    const token = req.headers.authorization ?? ""
    req.user = jwt.verify(token.split('Bearer ')[1], JWT_SECRET) as Token;
    console.log("req.user", req.user)
    next()
  } catch (error) {
    res
        .status(500)
        .json({message: (error as Error).message})
  }
}

export const authGoogleMiddleware = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization_google || ""

    if(!token || typeof token !== 'string') {
      next()
      return
    }
    req.user = jwt.decode(token.split('Bearer ')[1], {complete: true}) as JwtPayload;


    next()

  } catch (error) {
    console.log("error", error)
    res.status(500)
        .json({message: (error as Error).message})
  }
}

