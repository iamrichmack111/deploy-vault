#!/bin/sh
set -eu
repo_dir=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$repo_dir"
mkdir -p voices media demo-artifacts
voice=voices/en_US-ryan-high.onnx
if [ ! -f "$voice" ]; then
  curl -fL -o "$voice" https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx
  curl -fL -o "$voice.json" https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx.json
fi
python3 -c 'import piper' >/dev/null 2>&1 || python3 -m pip install --user piper-tts
npm install
npx playwright install chromium
python3 scripts/synthesize-narration.py \
  --model "$voice" --config "$voice.json" \
  --scenes scripts/narration-scenes.txt \
  --output demo-artifacts/narration.wav \
  --timeline demo-artifacts/scene-durations.json
node scripts/capture-demo.mjs
ffmpeg -y -i media/deployvault-demo-raw.webm -i demo-artifacts/narration.wav \
  -shortest -af volume=-1.5dB -c:v libx264 -preset medium -crf 25 \
  -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart \
  media/deployvault-demo.mp4
echo "Created media/deployvault-demo.mp4"
