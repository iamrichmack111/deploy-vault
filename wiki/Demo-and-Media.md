# Demo and Media Production

[![DeployVault demo preview](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/wiki-dashboard.png)](https://github.com/iamrichmack111/deploy-vault/blob/main/media/deployvault-demo.mp4)

The full-feature demo is recorded from the real application with Playwright and narrated with Piper's `en_US-ryan-high` voice. It covers the complete training workflow rather than using static mockups.

## Demo chapters

| Time | Chapter |
|---:|---|
| 0:00 | Welcome and safe simulation |
| 0:24 | Readiness dashboard |
| 0:57 | 46-scenario incident bank |
| 1:30 | Incident lab and topology |
| 1:57 | Simulated kubectl terminal |
| 2:37 | Hints and score tradeoffs |
| 2:57 | Five-part response grading |
| 3:28 | Runbooks and case studies |
| 3:56 | Timed interview practice |
| 4:31 | Spaced-repetition study |
| 4:57 | Ten-incident exam |
| 5:24 | Custom incident creation |
| 5:51 | Local progress and reset |
| 6:16 | Desktop, Docker, GHCR, CI/CD, and D2 |
| 6:58 | Complete readiness workflow |

## Build requirements

- Node and npm
- Playwright Chromium
- Python and `piper-tts`
- Piper `en_US-ryan-high` model and configuration
- FFmpeg

## Rebuild everything

```bash
npm run demo:build
```

The pipeline synthesizes narration scene by scene, measures the exact duration of each WAV segment, records matching browser scenes, and combines the video with AAC audio.

## Outputs

| File | Purpose |
|---|---|
| `media/deployvault-demo.mp4` | Final narrated walkthrough |
| `media/wiki-dashboard.png` | README and wiki poster |
| `media/incident-lab.png` | Lab documentation screenshot |
| `media/interview-mode.png` | Interview documentation screenshot |
| `demo-artifacts/` | Temporary narration, timing, and capture files |

Temporary capture files, browser downloads, voice models, and raw WebM files are excluded from Git.

## Verify media

```bash
ffprobe -v error \
  -show_entries stream=codec_type,codec_name,width,height \
  -show_entries format=duration,size \
  media/deployvault-demo.mp4
```

The final video should contain an H.264 video stream and AAC audio stream. Open it locally before committing:

```bash
open media/deployvault-demo.mp4
```

## Screenshot troubleshooting

If a screenshot contains `Not Found`, do not extract another frame from the same incorrect video. Start the working application, wait for `/api/health`, and capture `http://127.0.0.1:PORT` directly with Playwright.
