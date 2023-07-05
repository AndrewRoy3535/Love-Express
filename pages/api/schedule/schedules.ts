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
    case "GET":
      try {
        const schedules = await Schedules.find()
        .lean();
        if (!schedules?.length) {
          return res.status(400).json({ message: "No schedule found!" });
        }
        res.status(200).json(schedules);
      } catch (error) {
        res.status(400).json({ message: "Resquest error!" });
      }
      break;
    case "POST":
      try {
        const {
          date,
          time,
          coachType,
          coachCategory,
          coachNo,
          startingCounter,
          endCounter,
          registrationNumber,
          coachClass,
          fare,
          livingFrom,
          goingTo,
          passengersId,
        } = req.body;
        if (
          !date ||
          !time ||
          !coachType ||
          !coachCategory ||
          !coachNo ||
          !startingCounter ||
          !endCounter ||
          !registrationNumber ||
          !coachClass ||
          !fare ||
          !livingFrom ||
          !goingTo
        ) {
          res.status(400).json({ message: "All fields are required!" });
        }

        const scheduleObj = {
          date,
          time,
          coachType,
          coachCategory,
          coachNo,
          startingCounter,
          endCounter,
          registrationNumber,
          coachClass,
          fare,
          livingFrom,
          goingTo,
          passengersId,
        };

        const newSchedule = await Schedules.create(scheduleObj);

        if (newSchedule) {
          return res.status(200).json({
            message: `A new Schedule has created. Coach no: ${coachNo} is living from ${livingFrom} to ${goingTo}, time/date: ${time}/ ${date}`,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid schedule data received" });
        }
      } catch (error) {
        res.status(400).json({ messege: "Failed to create schedule!" });
      }
      break;
    case "PATCH":
      try {
        const {
          id,
          date,
          time,
          coachType,
          coachCategory,
          coachNo,
          startingCounter,
          endCounter,
          registrationNumber,
          coachClass,
          fare,
          livingFrom,
          goingTo,
          passengersId,
        } = req.body;

        if (
          !id ||
          (!date &&
            !time &&
            !coachType &&
            !coachCategory &&
            !coachNo &&
            !startingCounter &&
            !endCounter &&
            !registrationNumber &&
            !coachClass &&
            !fare &&
            !livingFrom &&
            !goingTo &&
            !passengersId)
        ) {
          return res
            .status(400)
            .json({ message: "All fields except password are required" });
        }

        const schedule = await Schedules.findById(id).exec();

        if (!schedule) {
          return res.status(400).json({ message: "schedule not found" });
        }

        schedule.date = date;
        schedule.time = time;
        schedule.coachType = coachType;
        schedule.coachCategory = coachCategory;
        schedule.coachNo = coachNo;
        schedule.startingCounter = startingCounter;
        schedule.endCounter = endCounter;
        schedule.registrationNumber = registrationNumber;
        schedule.coachClass = coachClass;
        schedule.fare = fare;
        schedule.livingFrom = livingFrom;
        schedule.goingTo = goingTo;
        schedule.passengersId = passengersId;
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
