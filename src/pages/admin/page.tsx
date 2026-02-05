"use client";

import { useState, useEffect } from "react";
import { LandingContent } from "../types/content";

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<LandingContent>({
    hero: { title: "", subtitle: "", imageUrl: "" },
    about: { heading: "", paragraph: "" },
    testimonials: [],
    faq: [],
  });


  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) setToken(data.token);
    else alert(data.message);
  };

  
  useEffect(() => {
    if (!token) return;
    fetch("/api/content")
      .then(res => res.json())
      .then(setContent);
  }, [token]);


  const updateContent = async () => {
    if (!token) return;
    const res = await fetch("/api/admin/update-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    if (res.ok) alert("✅ Content updated successfully");
  };


  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">🔐 Admin Login</h2>
          <input
            className="w-full mb-4 p-3 border rounded-lg border-gray-300"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full mb-4 p-3 border rounded-lg border-gray-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-3xl font-bold">🛠️ Landing Page Admin</h1>


      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Hero Section</h3>
        <input
          className="w-full p-3 border rounded-lg border-gray-300"
          placeholder="Title"
          value={content.hero.title}
          onChange={e => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
        />
        <input
          className="w-full p-3 border rounded-lg border-gray-300"
          placeholder="Subtitle"
          value={content.hero.subtitle}
          onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
        />
        <input
          className="w-full p-3 border rounded-lg border-gray-300"
          placeholder="Image URL"
          value={content.hero.imageUrl}
          onChange={e => setContent({ ...content, hero: { ...content.hero, imageUrl: e.target.value } })}
        />
      </div>


      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">About Section</h3>
        <input
          className="w-full p-3 border rounded-lg border-gray-300"
          placeholder="Heading"
          value={content.about.heading}
          onChange={e => setContent({ ...content, about: { ...content.about, heading: e.target.value } })}
        />
        <textarea
          className="w-full p-3 border rounded-lg border-gray-300 min-h-[80px]"
          placeholder="Paragraph"
          value={content.about.paragraph}
          onChange={e => setContent({ ...content, about: { ...content.about, paragraph: e.target.value } })}
        />
      </div>

     
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Testimonials</h3>

        {content.testimonials.map((t, i) => (
          <div key={i} className="space-y-2">
            <input
              className="w-full p-3 border rounded-lg border-gray-300"
              placeholder="Name"
              value={t.name}
              onChange={e => {
                const testimonials = [...content.testimonials];
                testimonials[i].name = e.target.value;
                setContent({ ...content, testimonials });
              }}
            />
            <input
              className="w-full p-3 border rounded-lg border-gray-300"
              placeholder="Role"
              value={t.role}
              onChange={e => {
                const testimonials = [...content.testimonials];
                testimonials[i].role = e.target.value;
                setContent({ ...content, testimonials });
              }}
            />
            <textarea
              className="w-full p-3 border rounded-lg border-gray-300 min-h-[60px]"
              placeholder="Text"
              value={t.text}
              onChange={e => {
                const testimonials = [...content.testimonials];
                testimonials[i].text = e.target.value;
                setContent({ ...content, testimonials });
              }}
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition"
              onClick={() =>
                setContent({ ...content, testimonials: content.testimonials.filter((_, idx) => idx !== i) })
              }
            >
              Delete
            </button>
          </div>
        ))}

        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={() =>
            setContent({ ...content, testimonials: [...content.testimonials, { name: "", role: "", text: "" }] })
          }
        >
          + Add Testimonial
        </button>
      </div>

   
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">FAQ</h3>

        {content.faq.map((f, i) => (
          <div key={i} className="space-y-2">
            <input
              className="w-full p-3 border rounded-lg border-gray-300"
              placeholder="Question"
              value={f.question}
              onChange={e => {
                const faq = [...content.faq];
                faq[i].question = e.target.value;
                setContent({ ...content, faq });
              }}
            />
            <textarea
              className="w-full p-3 border rounded-lg border-gray-300 min-h-[60px]"
              placeholder="Answer"
              value={f.answer}
              onChange={e => {
                const faq = [...content.faq];
                faq[i].answer = e.target.value;
                setContent({ ...content, faq });
              }}
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition"
              onClick={() =>
                setContent({ ...content, faq: content.faq.filter((_, idx) => idx !== i) })
              }
            >
              Delete
            </button>
          </div>
        ))}

        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={() => setContent({ ...content, faq: [...content.faq, { question: "", answer: "" }] })}
        >
          + Add FAQ
        </button>
      </div>

      <button
        className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
        onClick={updateContent}
      >
        💾 Save All Changes
      </button>
    </div>
  );
}
