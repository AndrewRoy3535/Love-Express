import type { NextApiRequest, NextApiResponse } from "next";
import Booking from "../../model/Booking";
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
        const bookings = await Booking.find()
          .populate({ path: "scheduleId", model: "Schedules" })
          .lean();
        if (!bookings?.length) {
          return res.status(400).json({ message: "No bookings found!" });
        }
        res.status(200).json(bookings);
      } catch (error) {
        res.status(400).json({ message: "Resquest error!" });
      }
      break;
    case "POST":
      try {
        const { scheduleId, mobile, seats } = req.body;

        if (!scheduleId || !mobile || !seats) {
          res.status(400).json({ message: "All fields are required!" });
        }

        const newbooking = await Booking.create(req.body);
        const bookingId = newbooking._id;
        await newbooking.save();

        const id = bookingId;
        if (newbooking) {
          return res.status(200).json({
            message: `A new booking created with id: ${id}`,
            id,
            scheduleId,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid booking data received" });
        }
      } catch (error) {
        res.status(400).json({ messege: "Failed to create booking!" });
      }
      break;
    case "PATCH":
      try {
        const {
          id,
          scheduleId,
          passengername,
          gender,
          address,
          boardngpoint,
          dropingpoint,
          mobile,
          email,
          age,
          seats,
          cancel,
        } = req.body;

        if (!id) {
          return res.status(400).json({ message: "Schedule ID is required" });
        }

        const booking = await Booking.findById(id).exec();

        if (!booking) {
          return res.status(400).json({ message: "Booking not found" });
        }

        booking.scheduleId = scheduleId;
        booking.passengername = passengername;
        booking.gender = gender;
        booking.address = address;
        booking.boardngpoint = boardngpoint;
        booking.dropingpoint = dropingpoint;
        booking.mobile = mobile;
        booking.email = email;
        booking.age = age;
        booking.seats = seats;
        booking.cancel = cancel;

        const updatedBooking = await booking.save();
        if (updatedBooking) {
          return res.status(201).json({
            messege: `user updated to ${updatedBooking.passengername}`,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    case "DELETE":
      try {
        const { id, passengername } = req.body;
        if (!id) {
          return res.status(400).json({ message: "Passenger ID Required" });
        }

        const booking = Booking.findById(id);

        if (!booking) {
          return res.status(400).json({ message: "booking not found" });
        }

        await booking.deleteOne();

        const reply = `Passenger ${passengername} with ID ${id} deleted`;

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
