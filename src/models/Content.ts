import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      imageUrl: { type: String }, 
    },
    about: {
      heading: { type: String },
      paragraph: { type: String },
    },
    testimonials: [
      {
        name: String,
        role: String,
        text: String,
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
