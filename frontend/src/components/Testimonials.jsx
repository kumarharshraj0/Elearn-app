// src/components/Testimonials.jsx

const testimonials = [
  {
    name: "Aarav Sharma",
    text: "This platform really helped me to upskill quickly!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Mehta",
    text: "Best learning experience, easy to use and very engaging.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Verma",
    text: "I got my first job after completing a course here!",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Simran Kaur",
    text: "The courses are well structured and practical.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Vikram Singh",
    text: "Teachers are very supportive and knowledgeable.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

function Row({ items, direction }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex gap-6 animate-scroll ${
          direction === "right" ? "animate-scroll-reverse" : ""
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="min-w-[280px] bg-white shadow-lg rounded-xl p-6 flex items-center gap-4"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-600 italic">"{t.text}"</p>
              <h3 className="font-semibold text-green-700 mt-2">{t.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What Our Students Say
      </h2>

      <div className="space-y-8">
        <Row items={testimonials} direction="left" />
        <Row items={testimonials} direction="right" />
        <Row items={testimonials} direction="left" />
      </div>
    </section>
  );
}
