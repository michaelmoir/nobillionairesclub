# Podcast Publishing (Stage 1)

This project uses a simple, file-based catalog:

- Episode metadata lives in `src/content/podcasts.ts`
- Podcast list page reads from that catalog
- Episode detail pages are generated at `/podcasts/[slug]`
- RSS feed is generated at `/rss.xml`

## Add a new episode

1. Upload audio to one of:
   - NAS-hosted local path: `public/podcasts-audio/<file>.mp3`
   - Public media host URL (recommended): `https://media.yourdomain/...`
2. Add a new entry in `src/content/podcasts.ts`
3. Ensure fields are filled:
   - `slug`, `title`, `publishedAt`, `summary`, `duration`, `audioUrl`
   - `coverImage`, `tags`, `showNotesFile`
   - Optional: `fileSizeBytes`
4. Deploy/restart site

## Naming convention

Use four digits for episode assets and audio:

- `NBC0001.mp3`
- `NBC0002.mp3`
- ...

## Storage recommendation

For your "simple and free" goal:

- Best first choice: **NAS-hosted files** served from your domain
  - Keep files in `public/podcasts-audio/`
  - Pros: free, simple, fully controlled by you
  - Cons: bandwidth and uptime depend on your home connection

- Avoid using Google Drive for production podcast hosting
  - Drive links are not designed as stable podcast CDN/enclosure URLs
  - Can have throttling, auth edge cases, and unstable redirects

If you outgrow NAS bandwidth later, keep the same metadata format and switch `audioUrl` values to a CDN/bucket.

## Transcript generation (local NAS)

To create transcripts from MP3 files:

```bash
./scripts/transcribe-podcasts.sh
```

This script uses a Docker Whisper image and writes `.txt` transcripts to:
This script uses a Python container, installs Whisper + ffmpeg, and writes `.txt` transcripts to:

- `content/podcast-transcripts/`

After transcripts are generated, show notes can be drafted from the actual episode content.
