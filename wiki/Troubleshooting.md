# Troubleshooting

![DeployVault architecture reference](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/architecture.svg)

## Port already in use

Start on another port:

```bash
./start.sh --port 8081
```

Identify the listener on macOS or Linux:

```bash
lsof -nP -iTCP:8080 -sTCP:LISTEN
```

Stop only the confirmed DeployVault process; do not terminate unrelated services.

## Browser opens but the application does not load

Check the health endpoint:

```bash
curl -v http://127.0.0.1:8080/api/health
```

If health works, hard-refresh the browser. If it fails, read the terminal where `start.sh` is running.

## Progress disappeared

Confirm that the same browser profile, host, and port are in use. Browser storage for `127.0.0.1:8080` is separate from `localhost:8080` and `127.0.0.1:8081`. Private-browsing sessions may discard storage when closed.

## Microphone transcription is unavailable

Speech recognition depends on browser support and permission. Type the response when it is unavailable. On macOS, check **System Settings → Privacy & Security → Microphone** for the browser.

## Demo screenshot shows `Not Found`

Wait for health before capture:

```bash
./start.sh --port 8099 --no-browser &
until curl -fsS http://127.0.0.1:8099/api/health >/dev/null; do sleep 1; done
npx playwright screenshot --viewport-size="1440,900" \
  http://127.0.0.1:8099 media/wiki-dashboard.png
```

## Video has no audible narration

Confirm that the file contains audio:

```bash
ffprobe -v error -show_entries stream=codec_type,codec_name \
  media/deployvault-demo.mp4
```

On macOS, confirm that output is set to MacBook speakers rather than BlackHole. BlackHole is a virtual audio device and does not play through speakers unless it is part of a Multi-Output Device.

## Docker image does not start

```bash
docker run --rm -p 8080:8080 ghcr.io/iamrichmack111/deploy-vault:latest
docker ps -a
docker logs CONTAINER_ID
```

Check whether port 8080 is already occupied and whether the image architecture matches the host.

## GHCR pull is denied

Confirm package visibility and repository access in GitHub package settings. Authenticate for private packages:

```bash
gh auth token | docker login ghcr.io -u iamrichmack111 --password-stdin
```

## GitHub Wiki push fails

Confirm SSH Git operations:

```bash
gh auth status
ssh -T git@github.com
```

Enable the repository Wiki in GitHub settings. Some repositories require creating the first Home page in the browser before the separate `.wiki.git` repository becomes cloneable. After that one-time initialization, rerun `./scripts/publish-wiki.sh`.
