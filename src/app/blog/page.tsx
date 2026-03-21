const starterPosts = [
  {
    title: "Why Class Analysis Still Matters in 2026",
    excerpt:
      "A primer on reading everyday headlines through the lens of power and ownership.",
  },
  {
    title: "Tech Policy and the Public Interest",
    excerpt:
      "Breaking down how policy choices shape who benefits from technology.",
  },
];

export default function BlogPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Blog</h1>
        <p className="max-w-3xl text-zinc-700">
          Essays, analysis, and explainers about politics, technology, and
          economic narratives.
        </p>
      </div>
      <div className="space-y-4">
        {starterPosts.map((post) => (
          <article
            key={post.title}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{post.title}</h2>
            <p className="mt-2 text-zinc-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
