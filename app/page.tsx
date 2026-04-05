import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-6">
          NEET 2024 Pattern
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Smart NEET Mock Tests<br />Powered by 10 Years of PYQs
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Adaptive tests that learn your weak areas, track your progress across all four
          subjects, and ensure you never see the same question twice.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Start Free
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            {
              icon: "🧠",
              title: "Adaptive Difficulty",
              desc: "Tests automatically adjust based on your weak chapters and past performance.",
            },
            {
              icon: "🚫",
              title: "No Repeated Questions",
              desc: "Our engine tracks every question you've seen across all your test sessions.",
            },
            {
              icon: "📊",
              title: "Detailed Analytics",
              desc: "Subject-wise accuracy, chapter trends, and actionable focus recommendations.",
            },
            {
              icon: "📝",
              title: "NEET 2024 Pattern",
              desc: "180 questions, 200 marks, 3h 20min — matches the exact exam format.",
            },
            {
              icon: "📅",
              title: "10 Years of PYQs",
              desc: "Questions tagged by year (2014–2024), chapter, concept, and difficulty.",
            },
            {
              icon: "🔬",
              title: "Detailed Review",
              desc: "Every test comes with full explanations and correct-answer highlights.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to crack NEET?</h2>
        <Link
          href="/register"
          className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
}
