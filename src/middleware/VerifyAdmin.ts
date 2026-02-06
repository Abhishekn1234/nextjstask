import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function verifyAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    res.status(401).json({ message: "Invalid token" });
    throw new Error("Invalid token");
  }
}
