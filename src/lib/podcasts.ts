import { podcastEpisodes, type PodcastEpisode } from "@/content/podcasts";

export function getAllPodcastEpisodes(): PodcastEpisode[] {
  return [...podcastEpisodes].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function getPodcastEpisodeBySlug(slug: string): PodcastEpisode | undefined {
  return podcastEpisodes.find((episode) => episode.slug === slug);
}
