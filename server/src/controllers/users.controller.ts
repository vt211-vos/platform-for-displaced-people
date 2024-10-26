import {Request, Response} from "express";
import {db} from "../lib/db";

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

  async findOne(req: Request, res: Response) {
    res.status(200).json({
      message: "findOne OK",
      reqParamId: req.params.id
    });
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
