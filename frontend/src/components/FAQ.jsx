import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This is an online e-learning platform where you can access high-quality courses, expert blogs, and learning resources.",
  },
  {
    question: "Are the courses beginner friendly?",
    answer:
      "Yes! Our courses are designed for both beginners and professionals. Each course has step-by-step explanations.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes, you will receive a verified certificate after successfully completing a course.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Absolutely! Our platform is fully responsive and works on laptops, tablets, and smartphones.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, some courses come with free trial lessons so you can explore before enrolling.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-600" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
