import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/pages/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    await connectToDatabase();

  
    const admin = await User.findOne({ email, role: "admin" }).select("+password");

    if (!admin) {
  
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

  
    const adminData = {
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    return res.status(200).json({ token, admin: adminData });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
