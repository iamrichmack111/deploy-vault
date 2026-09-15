<p align="center"><img src="assets/deployvault-icon.png" width="128" alt="DeployVault icon"></p>

# DeployVault

<p align="center"><strong>Break production safely. Learn to restore it confidently.</strong></p>

<p align="center">
  <img alt="CI" src="https://github.com/iamrichmack111/deploy-vault/actions/workflows/ci.yml/badge.svg">
  <img alt="GHCR" src="https://img.shields.io/badge/GHCR-multi--arch-2496ED?logo=docker&logoColor=white">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.9%2B-3776AB?logo=python&logoColor=white">
  <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-46_drills-326CE5?logo=kubernetes&logoColor=white">
  <img alt="Zero dependencies" src="https://img.shields.io/badge/runtime_dependencies-0-54f3a3">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8a9ba8">
</p>

DeployVault is an offline-capable Kubernetes incident simulator, interview trainer,
and readiness dashboard. It provides realistic command output without connecting
to a real cluster, so engineers can practice production troubleshooting safely.

**Tags:** `kubernetes` · `devops` · `sre` · `kubectl` · `incident-response` ·
`platform-engineering` · `interview-prep` · `training-simulator`

## Demo

[![DeployVault dashboard](media/dashboard.png)](media/deployvault-demo.mp4)

The 40-second demo is recorded by Playwright and narrated with the high-quality
Piper `en_US-ryan-high` male voice. Click the dashboard image to open the MP4.

## Screenshots

| Incident investigation lab | Timed interview practice |
|---|---|
| ![Incident lab](media/incident-lab.png) | ![Interview mode](media/interview-mode.png) |

## What is included

- 46 realistic Kubernetes production incidents
- Simulated terminal with real `kubectl` investigation patterns
- Command history, Tab completion, hints, scoring, and topology tracing
- Five-part response rubric: investigation, commands, cause, fix, prevention
- Timed interview mode with optional browser speech transcription
- Ten-incident certification-style exam
- Spaced repetition and smart weak-area practice
- Animated readiness and category-mastery dashboard
- Personal runbook notes with Markdown export
- Custom incident creator with browser-persistent storage
- macOS, Linux, and Windows user-level desktop installation
- Multi-architecture GHCR workflow for `linux/amd64` and `linux/arm64`
- Playwright screenshots/video, Piper narration, and D2 diagram sources

## Quick start — no installation

```bash
unzip deploy-vault-lite.zip
cd deploy-vault-lite
chmod +x start.sh
./start.sh
```

Open `http://127.0.0.1:8080`. Python 3 is the only requirement.

Use another port:

```bash
./start.sh --port 8081
```

Allow access from another device on your LAN:

```bash
./start.sh --host 0.0.0.0 --no-browser
```

## Initialize GitHub over SSH

```bash
gh auth login --hostname github.com --git-protocol ssh
./scripts/init-github.sh
```

The initializer uses an existing Ed25519 key or creates one at
`$HOME/.ssh/id_ed25519`, registers its public key with GitHub when needed, tests
the connection, and sets this SSH remote:

```text
git@github.com:iamrichmack111/deploy-vault.git
```

To use another account, repository name, or key:

```bash
GITHUB_OWNER=your-account \
DEPLOYVAULT_SSH_KEY="$HOME/.ssh/your_github_key" \
./scripts/init-github.sh your-repository-name
```

See [`docs/GITHUB-SSH.md`](docs/GITHUB-SSH.md) for verification and troubleshooting.

## Install as a desktop application

The installer detects the operating system automatically and installs only for
the current user—no administrator account is required.

### macOS or Linux

```bash
chmod +x install.sh
./install.sh
```

- macOS: installs `~/Applications/DeployVault.app`
- Linux: installs an application-menu entry and `~/.local/bin/deployvault`

### Windows PowerShell

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install.ps1
```

The generated desktop application uses the included native `.icns`, `.png`, and
`.ico` icon assets.

## Run the container

Build locally:

```bash
docker build -t deploy-vault .
docker run --rm -p 8080:8080 deploy-vault
```

After the repository is pushed and the GHCR workflow completes:

```bash
docker run --rm -p 8080:8080 ghcr.io/iamrichmack111/deploy-vault:latest
```

## Architecture

![DeployVault architecture](media/architecture.svg)

The editable D2 source is at `docs/d2/architecture.d2`.

## Training process

![Training process](media/training-process.svg)

The editable D2 source is at `docs/d2/training-process.d2`.

## CI/CD and delivery

![Delivery pipeline](media/delivery-pipeline.svg)

- `.github/workflows/ci.yml` validates Python, JavaScript, API health, and drill count.
- `.github/workflows/ghcr.yml` publishes signed-in multi-architecture images using
  GitHub's built-in package token.
- `Dockerfile` is a non-root, zero-package-install production image.

## Regenerate screenshots and the narrated demo

Requirements: Node 22+, Python 3, `ffmpeg`, `curl`, and Piper.

```bash
npm run demo:build
```

The script downloads Playwright Chromium and Piper's `en_US-ryan-high` voice,
captures the real application, produces screenshots, synthesizes narration, and
exports `media/deployvault-demo.mp4`.

## Project structure

```text
app.py                    zero-dependency local server
data/                     46 Kubernetes incident definitions
static/                   application UI
assets/                   desktop icons
desktop/                  desktop packaging area
docs/d2/                  editable architecture/process maps
media/                    screenshots, rendered maps, and demo video
scripts/                  Playwright and Piper demo pipeline
.github/workflows/        CI and GHCR publication
```

## Safety

DeployVault never executes submitted terminal commands. All output is loaded from
fictional incident fixtures, so the trainer cannot mutate a real Kubernetes cluster.

## License

MIT © Nicholas Jeremy Franklin
