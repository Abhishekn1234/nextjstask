import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Content from "../models/Content";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { index } = await req.json();

  const content = await Content.findOne();
  if (!content) {
    return NextResponse.json(
      { message: "Content not found" },
      { status: 404 }
    );
  }

  content.testimonials.splice(index, 1);
  await content.save();

  return NextResponse.json(content);
}
