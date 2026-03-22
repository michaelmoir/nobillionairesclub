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

The script builds a small Docker image once (`nbc-whisper`: Python + ffmpeg + `openai-whisper`), then runs Whisper with **visible progress**. During the image build you might briefly see `debconf` messages about Dialog/Readline; the Dockerfile sets non-interactive mode so those are harmless. Transcripts are written as `.txt` under:

- `content/podcast-transcripts/`

Default model is **`tiny`** (faster, less RAM). For better accuracy:

```bash
WHISPER_MODEL=base ./scripts/transcribe-podcasts.sh
```

After transcripts are generated, show notes can be drafted from the actual episode content.

### If Docker build fails with “Temporary failure resolving deb.debian.org”

That is **DNS inside Docker**, not your laptop sleeping. The script uses `--network=host` for `docker build` and `docker run` so the container uses the host’s resolver (same idea as `network: host` on your site image build). Re-run `./scripts/transcribe-podcasts.sh` after pulling the latest script.

### Pi-hole on your LAN

If the NAS (or Docker host) uses **Pi-hole as its DNS**, that’s fine and common. A few things to keep in mind:

1. **Docker + Pi-hole**  
   Default Docker bridge DNS sometimes misbehaves on home networks; we already use `--network=host` for builds/runs so resolution goes through the **same path as the host** (Pi-hole → upstream). That usually avoids “can’t resolve” during `apt` / Whisper.

2. **If Pi-hole blocks something**  
   Aggressive blocklists can occasionally block CDNs or API hosts used by builds or model downloads. If you see failures resolving or downloading:

   - Check Pi-hole **Query Log** for blocked domains during the build/transcription run.
   - Commonly allowlist (only if blocked): `deb.debian.org`, `pypi.org`, `files.pythonhosted.org`, `huggingface.co`, `cdn-lfs.huggingface.co` (Whisper may download model weights on first run).

3. **Pi-hole downtime**  
   If Pi-hole restarts or the NAS can’t reach it, **everything** on the LAN can fail DNS briefly. Use Pi-hole’s upstream redundancy or a second resolver on the NAS if you need higher reliability.

4. **Docker daemon DNS (optional)**  
   If you still see resolution issues inside containers *without* `--network=host`, you can set Docker’s DNS in `/etc/docker/daemon.json` (e.g. point `dns` to your Pi-hole IP or a public resolver). Only do this if needed; the transcription script already prefers host networking.
