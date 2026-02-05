"use client";

import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Content {
  hero: { title: string; subtitle: string; imageUrl?: string };
  about: { heading: string; paragraph: string };
  testimonials: Testimonial[];
  faq: FAQ[];
}

const emptyTestimonial: Testimonial = { name: "", role: "", text: "" };
const emptyFAQ: FAQ = { question: "", answer: "" };
const emptyContent: Content = {
  hero: { title: "", subtitle: "", imageUrl: "" },
  about: { heading: "", paragraph: "" },
  testimonials: [],
  faq: [],
};


export default function AdminDashboard() {
  const [content, setContent] = useState<Content>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState("");


  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then((data: Content) => setContent(data))
      .catch(() => setContent(emptyContent))
      .finally(() => setLoading(false));
  }, []);


  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setHeroFile(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (heroPreview) URL.revokeObjectURL(heroPreview);
    };
  }, [heroPreview]);


  const saveContent = async () => {
    try {
      const formData = new FormData();
      formData.append("heroTitle", content.hero.title);
      formData.append("heroSubtitle", content.hero.subtitle);
      if (heroFile) formData.append("heroImage", heroFile);
      formData.append("aboutHeading", content.about.heading);
      formData.append("aboutParagraph", content.about.paragraph);
      formData.append("testimonials", JSON.stringify(content.testimonials));
      formData.append("faq", JSON.stringify(content.faq));

      const res = await fetch("/api/admin/update-content", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Content saved successfully ✅");
        const updated = await res.json();
        setContent(updated);
        setHeroFile(null);
        setHeroPreview("");
      } else toast.error("Failed to save content ❌");
    } catch {
      toast.error("Error saving content ❌");
    }
  };


  const addTestimonial = () =>
    setContent(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, emptyTestimonial],
    }));
  const deleteTestimonial = (i: number) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, idx) => idx !== i),
    }));
    toast.info("Testimonial deleted 🗑️");
  };

 
  const addFAQ = () => setContent(prev => ({ ...prev, faq: [...prev.faq, emptyFAQ] }));
  const deleteFAQ = (i: number) => {
    setContent(prev => ({ ...prev, faq: prev.faq.filter((_, idx) => idx !== i) }));
    toast.info("FAQ deleted 🗑️");
  };

  if (loading)
    return <p className="p-10 text-gray-700 text-lg">Loading...</p>;

  return (
    <>
      <AdminNavbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Admin Dashboard</h1>

     
        <Section title="Hero Section">
          <Input
            placeholder="Hero Title"
            value={content.hero.title}
            onChange={v => setContent({ ...content, hero: { ...content.hero, title: v } })}
          />
          <Input
            placeholder="Hero Subtitle"
            value={content.hero.subtitle}
            onChange={v => setContent({ ...content, hero: { ...content.hero, subtitle: v } })}
          />
          <input type="file" onChange={handleHeroUpload} className="mt-2 mb-2" />
        
          {(heroFile && heroPreview) || (!heroFile && content.hero.imageUrl) ? (
            <img
              src={heroFile ? heroPreview : content.hero.imageUrl}
              alt="Hero Preview"
              className="mt-2 max-w-xs rounded-lg"
            />
          ) : null}
        </Section>

       
        <Section title="About Section">
          <Input
            placeholder="Heading"
            value={content.about.heading}
            onChange={v => setContent({ ...content, about: { ...content.about, heading: v } })}
          />
          <Textarea
            placeholder="Paragraph"
            value={content.about.paragraph}
            onChange={v => setContent({ ...content, about: { ...content.about, paragraph: v } })}
          />
        </Section>

      
        <Section title="Testimonials">
          {content.testimonials.map((t, i) => (
            <div key={i} className="border border-gray-300 rounded-lg p-4 mb-4">
              <Input
                placeholder="Name"
                value={t.name}
                onChange={v => {
                  const updated = [...content.testimonials];
                  updated[i].name = v;
                  setContent({ ...content, testimonials: updated });
                }}
              />
              <Input
                placeholder="Role"
                value={t.role}
                onChange={v => {
                  const updated = [...content.testimonials];
                  updated[i].role = v;
                  setContent({ ...content, testimonials: updated });
                }}
              />
              <Textarea
                placeholder="Testimonial"
                value={t.text}
                onChange={v => {
                  const updated = [...content.testimonials];
                  updated[i].text = v;
                  setContent({ ...content, testimonials: updated });
                }}
              />
              <button
                onClick={() => deleteTestimonial(i)}
                className="text-red-500 hover:underline mt-2"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={addTestimonial}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md mb-4"
          >
            ➕ Add Testimonial
          </button>
        </Section>

     
        <Section title="FAQs">
          {content.faq.map((f, i) => (
            <div key={i} className="border border-gray-300 rounded-lg p-4 mb-4">
              <Input
                placeholder="Question"
                value={f.question}
                onChange={v => {
                  const updated = [...content.faq];
                  updated[i].question = v;
                  setContent({ ...content, faq: updated });
                }}
              />
              <Textarea
                placeholder="Answer"
                value={f.answer}
                onChange={v => {
                  const updated = [...content.faq];
                  updated[i].answer = v;
                  setContent({ ...content, faq: updated });
                }}
              />
              <button
                onClick={() => deleteFAQ(i)}
                className="text-red-500 hover:underline mt-2"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={addFAQ}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md mb-4"
          >
            ➕ Add FAQ
          </button>
        </Section>

      
        <button
          onClick={saveContent}
          className="bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800"
        >
          Save All Changes
        </button>
      </div>
    </>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

const Input = ({ value, placeholder, onChange }: InputProps) => (
  <input
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

interface TextareaProps {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

const Textarea = ({ value, placeholder, onChange }: TextareaProps) => (
  <textarea
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    rows={4}
  />
);
