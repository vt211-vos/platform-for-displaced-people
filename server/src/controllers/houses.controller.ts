import {Request, Response} from "express";
import {db} from "../lib/db";
import {getCoordinates} from "../lib/tools/getCoordinations";


export default class HousesController {
  async create(req: Request, res: Response) {
    const {city, adress, numPlaces, details, userId} = req.body;
    let cityRecord = await db.city.upsert({
          where: {
            name: city
          },
          update: {},
          create: {
            name: city
          }
        }
    )

    const coordinates = await getCoordinates(adress, city)

    if(!coordinates) return res.status(400).json({message: "Invalid address"})
    console.log("coordinates", coordinates)

    const coordinatesRecord = await db.coordinate.create(
        {
          data: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }
        }
    )

     await db.house.create(
      {
        data: {
          adress: adress,
          numPlaces: numPlaces,
          details: details,
          cityId: cityRecord.id,
          coordinateId: coordinatesRecord.id,
          userId: userId
        }
      }
    )

    res.status(201).json({
      message: "create OK",
      reqBody: req.body
    });
  }

  async findAll(_req: Request, res: Response) {
    const houses = await db.house.findMany({
      include: {
        city: true,
        coordinate: true,
        user: {
          select: {
            phone: true,
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
