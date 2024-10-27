import {UserRole} from "../enums/users";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_SECRET} from "../lib/env";

interface Token extends JwtPayload {
  id: string,
  role: UserRole,
}


export const authMiddleware = (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization ?? ""
    const data = jwt.verify(token.split('Bearer ')[1], JWT_SECRET) as Token
    if (!roles.includes(data.role)) {
      res
        .status(403)
        .json({message: "Not allowed"})
    }
    next()
  } catch (error) {
    res
      .status(500)
      .json({message: (error as Error).message})
  }

}
