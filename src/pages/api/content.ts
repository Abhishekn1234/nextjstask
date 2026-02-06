
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Content from "@/pages/models/Content"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    const content = await Content.findOne();

    if (!content) {
      return res.status(200).json({
        hero: { title: "", subtitle: "", imageUrl: "" },
        about: { heading: "", paragraph: "" },
        testimonials: [],
        faq: [],
      });
    }

    res.status(200).json(content);
  } catch (error) {
    console.error("API /content error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
