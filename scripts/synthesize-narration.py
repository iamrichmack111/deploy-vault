#!/usr/bin/env python3
import argparse
import json
import re
import subprocess
import sys
import wave
from pathlib import Path


def parse_scenes(path):
    scenes, current, parts = [], None, []
    for raw in path.read_text(encoding="utf-8").splitlines():
        match = re.fullmatch(r"\[([a-z0-9-]+)\]", raw.strip())
        if match:
            if current:
                scenes.append((current, " ".join(parts).strip()))
            current, parts = match.group(1), []
        elif raw.strip():
            parts.append(raw.strip())
    if current:
        scenes.append((current, " ".join(parts).strip()))
    return scenes


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--config", required=True)
    parser.add_argument("--scenes", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--timeline", required=True)
    parser.add_argument("--length-scale", default="1.08")
    parser.add_argument("--gap", type=float, default=0.65)
    args = parser.parse_args()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    scene_dir = output.parent / "narration-scenes"
    scene_dir.mkdir(parents=True, exist_ok=True)
    scenes = parse_scenes(Path(args.scenes))
    titles = {
        "welcome": "Welcome and safe simulation", "dashboard": "Readiness dashboard",
        "incident-bank": "46-scenario incident bank", "lab-overview": "Incident lab and topology",
        "terminal": "Simulated kubectl terminal", "hints": "Hints and score tradeoffs",
        "grading": "Five-part response grading", "runbook": "Runbooks and case studies",
        "interview": "Timed interview practice", "study": "Spaced-repetition study",
        "exam": "Ten-incident exam", "custom": "Custom incident creation",
        "progress": "Local progress and reset", "shipping": "Desktop, Docker and CI/CD",
        "close": "Train for production confidence",
    }
    generated = []
    for index, (scene_id, text) in enumerate(scenes):
        wav_path = scene_dir / f"{index:02d}-{scene_id}.wav"
        subprocess.run([
            sys.executable, "-m", "piper", "--model", args.model, "--config", args.config,
            "--length-scale", args.length_scale, "--sentence-silence", "0.2", "--output-file", str(wav_path)
        ], input=text, text=True, check=True)
        generated.append((scene_id, text, wav_path))
    timeline = {"scenes": []}
    with wave.open(str(generated[0][2]), "rb") as first:
        params = first.getparams()
    with wave.open(str(output), "wb") as combined:
        combined.setparams(params)
        for index, (scene_id, text, wav_path) in enumerate(generated):
            with wave.open(str(wav_path), "rb") as source:
                if (source.getnchannels(), source.getsampwidth(), source.getframerate(), source.getcomptype()) != (
                    params.nchannels, params.sampwidth, params.framerate, params.comptype
                ):
                    raise RuntimeError(f"Audio parameters differ for {wav_path}")
                combined.writeframes(source.readframes(source.getnframes()))
                audio_seconds = source.getnframes() / source.getframerate()
            silence_frames = int(params.framerate * args.gap)
            combined.writeframes(b"\0" * silence_frames * params.sampwidth * params.nchannels)
            timeline["scenes"].append({
                "id": scene_id, "title": titles[scene_id], "index": index,
                "duration": round(audio_seconds + args.gap, 3), "narration": text,
            })
    timeline["duration"] = round(sum(scene["duration"] for scene in timeline["scenes"]), 3)
    Path(args.timeline).write_text(json.dumps(timeline, indent=2) + "\n", encoding="utf-8")
    print(f"Created {output} with {len(scenes)} scenes and {timeline['duration']:.1f} seconds.")


if __name__ == "__main__":
    main()
