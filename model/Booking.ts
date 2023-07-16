import { Document, Schema, model, models, Types } from "mongoose";

interface Booking extends Document {
  scheduleId: Types.ObjectId;
  passengername: string;
  gender: string;
  address: string;
  boardngpoint: string;
  dropingpoint: string;
  totalamonut: number;
  mobile: string;
  email: string;
  age: number;
  seats: Array<string>;
  cancel: boolean;
}

const BookingSchema = new Schema<Booking>(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "Schedules",
    },
    passengername: {
      type: String,
      default: "Not provided",
    },
    gender: {
      type: String,
      default: "Not provided",
    },
    address: {
      type: String,
      default: "Not provided",
    },
    boardngpoint: {
      type: String,
      default: "Not provided",
    },
    dropingpoint: {
      type: String,
      default: "Not provided",
    },
    totalamonut: Number,
    mobile: {
      type: String,
      default: "Not provided",
    },
    email: {
      type: String,
      default: "Not provided",
    },
    age: Number,
    seats: {
      type: [String],
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
