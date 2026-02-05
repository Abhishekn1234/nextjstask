import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Content from "@/pages/models/Content";
import formidable, { File } from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getFieldValue = (field: string | string[] | undefined) =>
  Array.isArray(field) ? field[0] : field || "";


const parseForm = (req: NextApiRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { fields, files } = await parseForm(req);

 
    let heroImage = "";
    const heroFile = files.heroImage
      ? Array.isArray(files.heroImage)
        ? files.heroImage[0]
        : files.heroImage
      : null;

    if (heroFile) {
      heroImage = `/uploads/${path.basename((heroFile as File).filepath)}`;
    } else if (fields.heroImageUrl) {
      heroImage = getFieldValue(fields.heroImageUrl);
    }

    const updateData = {
      hero: {
        title: getFieldValue(fields.heroTitle),
        subtitle: getFieldValue(fields.heroSubtitle),
        imageUrl: heroImage,
      },
      about: {
        heading: getFieldValue(fields.aboutHeading),
        paragraph: getFieldValue(fields.aboutParagraph),
      },
      testimonials: fields.testimonials
        ? JSON.parse(getFieldValue(fields.testimonials))
        : [],
      faq: fields.faq ? JSON.parse(getFieldValue(fields.faq)) : [],
    };

    const content = await Content.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    return res.status(200).json(content);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Update failed", error });
  }
}

