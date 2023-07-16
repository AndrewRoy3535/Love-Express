import type { NextApiRequest, NextApiResponse } from "next";
import Destinations from "../../model/Destinations";
import connection from "../../utils/connection";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connection();

  switch (method) {
    case "GET":
      try {
        const destination = await Destinations.find().lean();
        if (!destination?.length) {
          return res.status(400).json({ message: "No destination found!" });
        }
        res.status(200).json(destination);
      } catch (error) {
        res.status(400).json({ message: "Resquest error!" });
      }
      break;
    case "POST":
      try {
        const { place } = req.body;

        if (!place) {
          res.status(400).json({ message: "All fields are required!" });
        }

        const newDes = await Destinations.create(req.body);
        const desId = newDes._id;
        await newDes.save();

        if (newDes) {
          return res.status(200).json({
            message: `A new destinations created with id: ${desId}`,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid destination data received" });
        }
      } catch (error) {
        res.status(400).json({ messege: "Failed to create destination!" });
      }
      break;
    case "DELETE":
      try {
        const { id, place } = req.body;
        console.log(id, place);
        if (!id) {
          return res.status(400).json({ message: "ID Required" });
        }

        const des = await Destinations.findById(id);

        if (!des) {
          return res.status(400).json({ message: "Destination not found" });
        }

        await des.deleteOne();

        const reply = `Destination ${place} with ID ${id} deleted`;

        return res.json(reply);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error from Delete method" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
