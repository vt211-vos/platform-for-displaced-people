import {Request, Response} from "express";
import {db} from "../lib/db";
import {getCoordinates} from "../lib/tools/getCoordinations";


export default class HousesController {
  async create(req: Request, res: Response) {
    const {text, rate, houseId, userId} = req.body;

    await db.review.create({
      data: {
        text,
        rate,
        houseId,
        userId,
      }
    })

    res.status(201).json({
      message: "create OK",
      reqBody: req.body
    });
  }

  async findAll(_req: Request, res: Response) {
    const houses = await db.review.findMany({
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    })
    res.status(200).json(houses);
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
