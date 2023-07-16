import { Document, Schema, model, models, Types } from "mongoose";
import Booking from "./Booking";

interface Schedule extends Document {
  dateAndTime: Date;
  date: string;
  time: string;
  coachType: string;
  coachCategory: string;
  coachNo: string;
  startingCounter: string;
  endCounter: string;
  registrationNumber: string;
  coachClass: string;
  fare: number;
  sold: number;
  booked: number;
  available: number;
  livingFrom: string;
  goingTo: string;
  passengersId?: Types.ObjectId[];
}

const ScheduleScheam = new Schema<Schedule>(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    coachType: {
      type: String,
      required: true,
    },
    coachCategory: {
      type: String,
      required: true,
    },
    coachNo: {
      type: String,
      required: true,
    },
    startingCounter: {
      type: String,
      required: true,
    },
    endCounter: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    coachClass: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    livingFrom: {
      type: String,
      required: true,
    },
    goingTo: {
      type: String,
      required: true,
    },
    passengersId: [{ type: Schema.Types.ObjectId, ref: Booking }],
  },
  { timestamps: true }
);

const Schedules = models.Schedules || model("Schedules", ScheduleScheam);

export default Schedules;
