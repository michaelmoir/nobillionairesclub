export default function ContactPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Contact
      </h1>
      <p className="max-w-3xl leading-8 text-zinc-700">
        Want to collaborate, suggest a topic, or share feedback? Reach out and
        say hello.
      </p>
      <div className="rounded-xl border border-zinc-200 bg-white p-5 text-zinc-700">
        <p>
          Email:{" "}
          <a
            className="font-medium text-zinc-900 underline"
            href="mailto:hello@nobillionaires.club"
          >
            hello@nobillionaires.club
          </a>
        </p>
      </div>
    </section>
  );
}
