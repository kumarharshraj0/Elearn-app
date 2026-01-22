import { useParams, Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Top strategies for staying focused while learning online",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/800x400?text=Article+1",
    content: `Maintaining focus in an online environment can be challenging.
    In this article, we share practical tips, study hacks, and proven
    techniques to boost productivity.`,
  },
  {
    id: 2,
    title: "Mastering skills anytime: The future of eLearning",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/800x400?text=Article+2",
    content: `Discover how eLearning platforms are revolutionizing education.
    We’ll explore trends, advantages, and how learners can maximize their skills.`,
  },
  {
    id: 3,
    title: "Why certifications matter in the job market today",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/800x400?text=Article+3",
    content: `Professional certifications are becoming increasingly important.
    Here’s why they matter and how you can use them to stand out in your career.`,
  },
];

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return <h2 className="text-center mt-10">❌ Article not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <img
        src={article.img}
        alt={article.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-500 text-sm mb-4">📅 {article.date}</p>
      <h1 className="text-4xl font-bold text-[#0e2d25] mb-6">
        {article.title}
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {article.content}
      </p>

      <div className="mt-10">
        <Link
          to="/blog"
          className="px-6 py-2 bg-[#0e2d25] text-white rounded-full hover:bg-[#134c3a] transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
