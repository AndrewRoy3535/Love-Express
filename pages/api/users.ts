import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../model/User";
import connection from "../../utils/connection";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connection();

  switch (method) {
    case "GET":
      try {
        const users = await User.find().select("-password").lean();

        if (!users?.length) {
          return res.status(400).json({ message: "No user found!" });
        }
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ message: "Resquest error!" });
      }
      break;
    case "POST":
      try {
        const { name, password, admin } = req.body;
        if (!name || !password) {
          res.status(400).json({ message: "All fields are required!" });
        }
        const duplicateName = await User.findOne({ name }).lean().exec();

        const hasedPass = await bcrypt.hash(password, 10);

        if (duplicateName) {
          return res.status(409).json({ message: "Duplicate username" });
        }

        const userObj = { name, password: hasedPass, admin };

        const newUser = await User.create(userObj);

        if (newUser) {
          return res
            .status(200)
            .json({ message: `A new User:${name} created` });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid user data received" });
        }
      } catch (error) {
        res.status(400).json({ messege: "Failed to create user!" });
      }
      break;
    case "PATCH":
      try {
        const { id, name, password, updatedAt, admin } = req.body;

        if (!id || (!name && !password)) {
          return res
            .status(400)
            .json({ message: "All fields except password are required" });
        }

        const user = await User.findById(id).exec();

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        const duplicateName = await User.findOne({ name }).lean().exec();

        if (duplicateName && duplicateName?._id.toString() !== id) {
          return res.status(409).json({ message: "Duplicate username" });
        }

        user.name = name;
        user.updatedAt = updatedAt;
        user.admin = admin;

        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();
        if (updatedUser) {
          return res
            .status(201)
            .json({ messege: `user updated to ${updatedUser.name}` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    case "DELETE":
      try {
        const { id, name } = req.body;
        if (!id) {
          return res.status(400).json({ message: "User ID Required" });
        }

        const user = User.findById(id);

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        await user.deleteOne();

        const reply = `Username ${name} with ID ${id} deleted`;

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
