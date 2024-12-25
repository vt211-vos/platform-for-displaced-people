import {Request, Response} from "express";
import {db} from "../lib/db";
import {RequestAuth} from "../middlewares/auth";

export default class UsersController {
  async create(req: Request, res: Response) {
    res.status(201).json({
      message: "create OK",
      reqBody: req.body
    });
  }

  async findAll(_req: Request, res: Response) {
    const users = await db.user.findMany()
    res.status(200).json(users);
  }

  async findOne(req: RequestAuth, res: Response) {

    let { id } = req.user ? req.user : req.params;

    if(!id) return res.status(401).json({message: "Unauthorized"});

    const user = await db.user.findUnique({
      where: {id: id},
      select: {
        id: true,
        role: true,
        email: true,
      }
    })
    res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    res.status(200).json({
      message: "update OK",
      reqParamId: req.params.id,
      reqBody: req.body
    });
  }

  async delete(req: Request, res: Response) {
    res.status(200).json({
      message: "delete OK",
      reqParamId: req.params.id
    });
  }
}
