export default function Home() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-700">
          Politics. Tech. News.
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          No Billionaires Club
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">
          A blog and podcast focused on how division among the 99% benefits the
          1% and how we can build stronger solidarity through better analysis,
          better stories, and better conversations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-zinc-900">Latest podcast</h2>
          <p className="mt-2 text-zinc-700">
            New episodes break down current events through labor, class, and
            technology.
          </p>
        </article>
        <article className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-zinc-900">Latest blog</h2>
          <p className="mt-2 text-zinc-700">
            Essays and explainers designed to connect headlines to the bigger
            economic picture.
          </p>
        </article>
      </div>
    </section>
  );
}
