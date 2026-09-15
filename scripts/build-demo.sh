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
node scripts/capture-demo.mjs
python3 -m piper --model "$voice" --config "$voice.json" --length-scale 1.08 --sentence-silence 0.18 --output_file demo-artifacts/narration.wav < scripts/narration.txt
ffmpeg -y -stream_loop -1 -i media/deployvault-demo-raw.webm -i demo-artifacts/narration.wav -shortest -af volume=-1.5dB -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart media/deployvault-demo.mp4
echo "Created media/deployvault-demo.mp4"
