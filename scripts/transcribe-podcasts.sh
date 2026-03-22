#!/usr/bin/env bash
# Transcribe all MP3s in public/podcasts-audio to content/podcast-transcripts/
#
# Usage:
#   ./scripts/transcribe-podcasts.sh
#   WHISPER_MODEL=base ./scripts/transcribe-podcasts.sh   # better quality, needs more RAM/time
#
# First run builds image nbc-whisper (can take several minutes). Next runs are fast.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AUDIO_DIR="$ROOT_DIR/public/podcasts-audio"
OUT_DIR="$ROOT_DIR/content/podcast-transcripts"
DOCKER="${DOCKER:-/var/packages/Docker/target/usr/bin/docker}"
IMAGE="${WHISPER_IMAGE:-nbc-whisper}"
MODEL="${WHISPER_MODEL:-tiny}"

mkdir -p "$OUT_DIR"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

if [ ! -d "$AUDIO_DIR" ]; then
  log "ERROR: Audio directory not found: $AUDIO_DIR"
  exit 1
fi

if ! command -v sudo >/dev/null 2>&1; then
  log "ERROR: sudo not found. Run as a user that can use docker, or edit this script."
  exit 1
fi

if ! sudo "$DOCKER" info >/dev/null 2>&1; then
  log "ERROR: Cannot talk to Docker (sudo docker info failed). Check Docker is running and your user can sudo."
  exit 1
fi

if ! sudo "$DOCKER" image inspect "$IMAGE" >/dev/null 2>&1; then
  log "Building Docker image $IMAGE (one-time; installs ffmpeg + whisper)..."
  # Use host network so apt inside the build can resolve DNS (same issue as Next.js docker build on some NAS setups)
  sudo "$DOCKER" build --network=host -f "$ROOT_DIR/scripts/Dockerfile.whisper" -t "$IMAGE" "$ROOT_DIR"
  log "Image $IMAGE ready."
else
  log "Using existing image: $IMAGE"
fi

log "Audio:  $AUDIO_DIR"
log "Output: $OUT_DIR"
log "Model:  $MODEL (set WHISPER_MODEL=base for higher quality if you have RAM)"

count=0
for file in "$AUDIO_DIR"/*.mp3; do
  [ -e "$file" ] || continue
  base="$(basename "$file")"
  count=$((count + 1))
  log "----------------------------------------"
  log "[$count] Transcribing: $base"
  log "This may take a long time; Whisper prints progress below."
  sudo "$DOCKER" run --rm --network=host \
    -v "$ROOT_DIR:/data" \
    "$IMAGE" \
    --model "$MODEL" \
    --language en \
    --output_format txt \
    --output_dir /data/content/podcast-transcripts \
    "/data/public/podcasts-audio/$base"
  log "Finished: $base"
done

if [ "$count" -eq 0 ]; then
  log "No .mp3 files found in $AUDIO_DIR"
  exit 1
fi

log "Done. Transcript files:"
ls -la "$OUT_DIR" || true
