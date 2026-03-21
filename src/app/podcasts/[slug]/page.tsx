import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllPodcastEpisodes,
  getPodcastEpisodeBySlug,
} from "@/lib/podcasts";
import { getShowNotesMarkdown } from "@/lib/show-notes";

type EpisodePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPodcastEpisodes().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getPodcastEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Episode Not Found | No Billionaires Club" };
  }

  return {
    title: `${episode.title} | No Billionaires Club`,
    description: episode.summary,
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getPodcastEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const showNotesMarkdown = await getShowNotesMarkdown(episode.showNotesFile);

  return (
    <article className="space-y-5">
      <Image
        src={episode.coverImage}
        alt={`${episode.title} cover`}
        width={520}
        height={520}
        className="h-auto w-full max-w-[320px] rounded-xl border border-zinc-200"
      />
      <p className="text-sm text-zinc-500">{episode.publishedAt}</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        {episode.title}
      </h1>
      <p className="text-zinc-700">{episode.summary}</p>
      <p className="text-sm text-zinc-500">Duration: {episode.duration}</p>
      <div className="flex flex-wrap gap-2">
        {episode.tags.map((episodeTag) => (
          <span
            key={episodeTag}
            className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-700"
          >
            {episodeTag}
          </span>
        ))}
      </div>

      <audio className="w-full" controls preload="none">
        <source src={episode.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {showNotesMarkdown ? (
        <section className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-900">Show notes</h2>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h3 className="mt-4 text-xl font-semibold text-zinc-900">{children}</h3>
              ),
              h2: ({ children }) => (
                <h4 className="mt-4 text-lg font-semibold text-zinc-900">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="mt-2 leading-8 text-zinc-700">{children}</p>
              ),
              li: ({ children }) => <li className="ml-5 list-disc text-zinc-700">{children}</li>,
            }}
          >
            {showNotesMarkdown}
          </ReactMarkdown>
        </section>
      ) : null}
    </article>
  );
}
