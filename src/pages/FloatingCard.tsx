"use client";

import React from "react";

interface FloatingCardProps {
  title: string;
  value: string;
  type?: "chart" | "graph";
  className?: string; 
}

export function FloatingCard({ title, value, type, className }: FloatingCardProps) {
  return (
    <div
      className={`
        bg-white p-4 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
        w-44 text-left z-10 
        absolute sm:relative sm:w-44
        ${className || ""}
      `}
    >
      <div className="text-[12px] font-semibold text-gray-900 mb-1">
        {title}
      </div>
      <div className="text-lg font-extrabold mb-3">
        {value}
      </div>

     
      {type === "chart" && (
        <div className="h-10 w-full bg-gray-200 rounded-md overflow-hidden relative">
          <div className="h-full bg-blue-500" style={{ width: "60%" }}></div>
        </div>
      )}

     
      {type === "graph" && (
        <div className="h-10 w-full flex items-end gap-1">
          {[40, 70, 45, 90, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-red-500 rounded-sm"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
