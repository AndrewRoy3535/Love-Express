import { error } from "console";
import mongoose from "mongoose";

const connection = async () => {
  if (!process.env.ATLAS_URI) {
    throw new Error("Invaild or missing env variables: 'MONGODB_URI'");
  }
  await mongoose.connect(process.env.ATLAS_URI);
};

mongoose.connection
  .once("open", () => console.log("Connected to MDB"))
  .on("error", () => {
    console.log("Connection Error:", error);
  });

connection().catch((err) => console.log(err));

export default connection;
