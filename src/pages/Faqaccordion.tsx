"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:px-8 font-inter text-gray-900">
     
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Get answers to common questions about our AI health assistant app
        </p>
      </div>

 
      <div className="border-t border-gray-200">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => toggle(i)}
                className={`
                  w-full py-6 text-left flex justify-between items-center text-lg sm:text-xl font-medium 
                  focus:outline-none transition-colors duration-200
                  ${isOpen ? "text-blue-600" : "text-gray-900"}
                `}
              >
                <span>{faq.question}</span>
                <span className="text-2xl sm:text-3xl font-light">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="pb-6 text-gray-500 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
