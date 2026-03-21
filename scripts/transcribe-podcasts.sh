#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AUDIO_DIR="$ROOT_DIR/public/podcasts-audio"
OUT_DIR="$ROOT_DIR/content/podcast-transcripts"

mkdir -p "$OUT_DIR"

echo "Transcribing podcast audio from: $AUDIO_DIR"
echo "Output transcripts to: $OUT_DIR"

for file in "$AUDIO_DIR"/*.mp3; do
  [ -e "$file" ] || continue
  echo "----"
  echo "Transcribing $(basename "$file")"
  sudo /var/packages/Docker/target/usr/bin/docker run --rm \
    -v "$ROOT_DIR:/data" \
    python:3.11-slim \
    bash -lc "apt-get update >/dev/null && \
      apt-get install -y --no-install-recommends ffmpeg >/dev/null && \
      pip install --no-cache-dir openai-whisper >/dev/null && \
      python -m whisper \
        --model base \
        --language en \
        --output_format txt \
        --output_dir /data/content/podcast-transcripts \
        /data/public/podcasts-audio/$(basename "$file")"
done

echo "Done. Transcript files:"
ls -1 "$OUT_DIR"
