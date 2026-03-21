import Link from "next/link";
import { getAllPodcastEpisodes } from "@/lib/podcasts";
import Image from "next/image";

type PodcastsPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function PodcastsPage({ searchParams }: PodcastsPageProps) {
  const episodes = getAllPodcastEpisodes();
  const { tag } = await searchParams;
  const selectedTag = tag?.toLowerCase();
  const availableTags = Array.from(
    new Set(episodes.flatMap((episode) => episode.tags)),
  ).sort();
  const filteredEpisodes = selectedTag
    ? episodes.filter((episode) =>
        episode.tags.some((episodeTag) => episodeTag === selectedTag),
      )
    : episodes;

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Podcasts
        </h1>
        <p className="max-w-3xl text-zinc-700">
          Listen to episodes focused on politics, tech, media narratives, and
          economic power.
        </p>
        <p className="text-sm text-zinc-600">
          RSS feed:{" "}
          <a className="underline" href="/rss.xml">
            /rss.xml
          </a>
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/podcasts"
            className={`rounded-full border px-3 py-1 text-sm ${
              !selectedTag
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 text-zinc-700"
            }`}
          >
            All
          </Link>
          {availableTags.map((availableTag) => (
            <Link
              key={availableTag}
              href={`/podcasts?tag=${encodeURIComponent(availableTag)}`}
              className={`rounded-full border px-3 py-1 text-sm ${
                selectedTag === availableTag
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 text-zinc-700"
              }`}
            >
              {availableTag}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredEpisodes.map((episode) => (
          <article
            key={episode.slug}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <div className="mb-4">
              <Image
                src={episode.coverImage}
                alt={`${episode.title} cover`}
                width={360}
                height={360}
                className="h-auto w-full max-w-[240px] rounded-lg border border-zinc-200"
              />
            </div>
            <p className="text-sm text-zinc-500">{episode.publishedAt}</p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-900">
              {episode.title}
            </h2>
            <p className="mt-2 text-zinc-700">{episode.summary}</p>
            <p className="mt-2 text-sm text-zinc-500">
              Duration: {episode.duration}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {episode.tags.map((episodeTag) => (
                <Link
                  key={episodeTag}
                  href={`/podcasts?tag=${encodeURIComponent(episodeTag)}`}
                  className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-700"
                >
                  {episodeTag}
                </Link>
              ))}
            </div>
            <audio className="mt-4 w-full" controls preload="none">
              <source src={episode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <Link
              href={`/podcasts/${episode.slug}`}
              className="mt-4 inline-block text-sm font-medium text-zinc-900 underline"
            >
              Episode details and show notes
            </Link>
          </article>
        ))}
        {filteredEpisodes.length === 0 ? (
          <p className="text-zinc-700">No episodes match this tag yet.</p>
        ) : null}
      </div>
    </section>
  );
}
