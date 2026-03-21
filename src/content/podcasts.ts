export type PodcastEpisode = {
  slug: string;
  title: string;
  publishedAt: string; // ISO date, example: 2026-03-15
  summary: string;
  duration: string;
  audioUrl: string;
  coverImage: string;
  tags: string[];
  showNotesFile: string;
  fileSizeBytes?: number;
};

export const podcastEpisodes: PodcastEpisode[] = [
  {
    slug: "welcome-to-no-billionaires-club",
    title: "Episode 001 - Welcome to the No Billionaires Club",
    publishedAt: "2026-03-15",
    duration: "18:42",
    summary:
      "An introduction to the project mission and why class-focused media analysis matters.",
    audioUrl: "/podcasts-audio/NBC0001-2025_11_14_21_24_35_1.mp3",
    coverImage: "/podcast-covers/nbc-0001.svg",
    tags: ["politics", "intro", "class-analysis"],
    showNotesFile: "welcome-to-no-billionaires-club.md",
  },
  {
    slug: "tech-hype-worker-reality",
    title: "Episode 002 - Tech Hype and Worker Reality",
    publishedAt: "2026-03-22",
    duration: "31:10",
    summary:
      "A discussion on how innovation stories can hide labor conditions and concentrated ownership.",
    audioUrl: "/podcasts-audio/NBC0002-2025_12_12_20_52_07_1.mp3",
    coverImage: "/podcast-covers/nbc-0002.svg",
    tags: ["tech", "labor", "media"],
    showNotesFile: "tech-hype-worker-reality.md",
  },
  {
    slug: "episode-0003",
    title: "Episode 003 - Manufactured Outrage and the 99%",
    publishedAt: "2025-12-12",
    duration: "27:48",
    summary:
      "How culture-war framing keeps working people divided while wealth and decision-making stay concentrated at the top.",
    audioUrl: "/podcasts-audio/NBC0003-2025_12_12_21_34_33_1.mp3",
    coverImage: "/podcast-covers/nbc-default.svg",
    tags: ["politics", "media", "class-analysis"],
    showNotesFile: "episode-0003.md",
  },
  {
    slug: "episode-0004",
    title: "Episode 004 - AI Promises, Public Costs",
    publishedAt: "2026-02-07",
    duration: "34:12",
    summary:
      "A grounded look at who benefits from AI hype cycles, who carries the risk, and what public-interest tech policy should prioritize.",
    audioUrl: "/podcasts-audio/NBC0004-2026_02_07_20_47_04_1.mp3",
    coverImage: "/podcast-covers/nbc-default.svg",
    tags: ["tech", "policy", "economics"],
    showNotesFile: "episode-0004.md",
  },
  {
    slug: "episode-0005",
    title: "Episode 005 - News Cycles and Economic Memory",
    publishedAt: "2026-02-07",
    duration: "22:36",
    summary:
      "Why fast-moving headlines can obscure long-term economic trends, and how to track the bigger structural story week to week.",
    audioUrl: "/podcasts-audio/NBC0005-2026_02_07_21_41_41_1.mp3",
    coverImage: "/podcast-covers/nbc-default.svg",
    tags: ["news", "economics", "media-literacy"],
    showNotesFile: "episode-0005.md",
  },
];
