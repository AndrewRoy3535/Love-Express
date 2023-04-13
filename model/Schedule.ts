import { Document, Schema, model, models } from "mongoose";

interface Schedule extends Document {
  dateAndTime: Date;
  date: string;
  time: string;
  coachType: string;
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
  },
  { timestamps: true }
);

const Schedules = models.Schedules || model("Schedules", ScheduleScheam);

export default Schedules;
