import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  await connectToDatabase();

  let admin = await User.findOne({
    email,
    role: "admin",
  }).select("+password");


  if (!admin) {
    const hashedPassword = await bcrypt.hash(password, 10);

    admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
    });
  } else {

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
  }


  const token = jwt.sign(
    { userId: admin._id, role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  return res.status(200).json({ token,admin });
}
