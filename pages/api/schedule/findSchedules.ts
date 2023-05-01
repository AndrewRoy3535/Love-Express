import Schedules from "../../../model/Schedule";
import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../../utils/connection";

const findByCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connection();

  switch (method) {
    case "POST":
      try {
        const { livingFrom, goingTo, date } = req.body;
        const schedule = await Schedules.find({
          livingFrom,
          goingTo,
          date,
        }).lean();

        res.status(200).json(schedule);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
};

export default findByCategory;
