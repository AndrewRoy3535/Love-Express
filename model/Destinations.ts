import { Document, Schema, model, models, Types } from "mongoose";

interface Destinations extends Document {
  place: string;
}

const DestinationSchema = new Schema<Destinations>(
  {
    place: {
      type: String,
      require: true,
      default: "Not provided",
    },
  },
  { timestamps: true }
);

const Destinations =
  models.Destinations || model("Destinations", DestinationSchema);

export default Destinations;
