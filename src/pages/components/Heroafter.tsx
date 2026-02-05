"use client";

import React from "react";
import { Chrome, Figma, Github, Slack, Zap } from "lucide-react";

export default function LogoCloud() {
  const logos = [
    { icon: <Chrome size={28} />, name: "Logoipsum" },
    { icon: <Figma size={28} />, name: "Logoipsum" },
    { icon: <Zap size={28} />, name: "Logoipsum" },
    { icon: <Github size={28} />, name: "Logoipsum" },
    { icon: <Slack size={28} />, name: "Logoipsum" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-10 px-5 py-10 bg-white">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="
            flex items-center gap-2 text-gray-400 opacity-80 filter grayscale
            transition-all duration-300 cursor-pointer
            hover:opacity-100 hover:grayscale-0 hover:text-gray-900
          "
        >
          {logo.icon}
          <span className="text-[20px] font-bold tracking-tight font-sans">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
}
