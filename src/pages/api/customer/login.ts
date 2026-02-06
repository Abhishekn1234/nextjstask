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

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password required" });
  }

  await connectToDatabase();

 
  let user = await User.findOne({email }).select("+password");

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
     
     
      email: email,
      password: hashedPassword,
      role: "customer",
    });
  } else {
  
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }

 
  const token = jwt.sign(
    { userId: user._id, role: "customer" },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    token,
    isNewUser: !user.createdAt ? true : false,
    user
  });
}
