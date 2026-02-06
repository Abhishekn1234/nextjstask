import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {

    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));


    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/admin/:path*"], 
};
