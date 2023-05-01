import { NextApiRequest, NextApiResponse } from "next";
import Schedules from "../../../model/Schedule";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log(req);
  try {
    const schedules = await Schedules.findById(id).exec();
    if (!schedules) {
      return res.status(400).json({ message: "No schedule found with id!" });
    }
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ message: "Resquest error!" });
  }
};
