import type { NextApiRequest, NextApiResponse } from "next";
import Schedules from "../../../model/Schedule";
import connection from "../../../utils/connection";

export default async function scheduleHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log(method);

  await connection();

  switch (method) {
    case "PATCH":
      try {
        const { id, date, time, livingFrom, goingTo, passengersId, coachNo } =
          req.body;

        if (!id) {
          return res
            .status(400)
            .json({ message: "All fields except password are required" });
        }

        const schedule = await Schedules.findById(id).exec();

        if (!schedule) {
          return res.status(400).json({ message: "schedule not found" });
        }

        schedule.passengersId.push(passengersId);
        const updatedSchedule = await schedule.save();

        if (updatedSchedule) {
          return res.status(201).json({
            message: `Schedule has been updated. Coach no: ${coachNo} is living from ${livingFrom} to ${goingTo}, time/date: ${time}/ ${date}`,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    case "DELETE":
      try {
        const { id, coachNo, livingFrom, goingTo, time, date } = req.body;
        if (!id) {
          return res.status(400).json({ message: "Schedule ID Required" });
        }

        const schedule = Schedules.findById(id);

        if (!schedule) {
          return res.status(400).json({ message: "Schedule not found" });
        }

        await schedule.deleteOne();

        const reply = `Schedule has been deleted. Coach no: ${coachNo} is living from ${livingFrom} to ${goingTo}, time/date: ${time}/ ${date}`;

        return res.json(reply);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error from Delete method" });
      }
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
