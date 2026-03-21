import { getAllPodcastEpisodes } from "@/lib/podcasts";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const episodes = getAllPodcastEpisodes();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nobillionaires.club";
  const podcastPageUrl = `${siteUrl}/podcasts`;

  const itemsXml = episodes
    .map((episode) => {
      const episodeUrl = `${siteUrl}/podcasts/${episode.slug}`;
      const pubDate = new Date(episode.publishedAt).toUTCString();
      const enclosureLength = episode.fileSizeBytes ?? 0;

      return `
        <item>
          <title>${escapeXml(episode.title)}</title>
          <description>${escapeXml(episode.summary)}</description>
          <link>${episodeUrl}</link>
          <guid>${episodeUrl}</guid>
          <pubDate>${pubDate}</pubDate>
          <enclosure url="${escapeXml(episode.audioUrl)}" type="audio/mpeg" length="${enclosureLength}" />
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>No Billionaires Club Podcast</title>
    <description>Politics, tech, and news from a 99% perspective.</description>
    <link>${podcastPageUrl}</link>
    <language>en-us</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
