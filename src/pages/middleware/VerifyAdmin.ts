import type { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export function verifyAdmin(req: NextApiRequest): DecodedToken {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (decoded.role !== "admin") {
      throw new Error("Forbidden: Not an admin");
    }

    return decoded;
  } catch (err) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
}
