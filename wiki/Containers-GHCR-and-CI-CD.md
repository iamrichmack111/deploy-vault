# Containers, GHCR and CI/CD

![DeployVault delivery pipeline](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/delivery-pipeline.svg)

DeployVault ships with a non-root container definition and two GitHub Actions workflows: validation and GHCR publication.

## Local container build

```bash
docker build -t deploy-vault .
docker run --rm -p 8080:8080 deploy-vault
```

Open `http://127.0.0.1:8080` and verify:

```bash
curl -fsS http://127.0.0.1:8080/api/health
```

## Published GHCR image

```bash
docker pull ghcr.io/iamrichmack111/deploy-vault:latest
docker run --rm -p 8080:8080 ghcr.io/iamrichmack111/deploy-vault:latest
```

Images are built for `linux/amd64` and `linux/arm64`, supporting common cloud hosts, Intel/AMD workstations, and ARM systems.

## CI workflow

`.github/workflows/ci.yml` runs on pushes and pull requests. It:

1. checks out the repository;
2. installs supported Python and Node versions;
3. validates JavaScript syntax;
4. compiles the Python application;
5. starts DeployVault;
6. checks the health endpoint; and
7. verifies that the API returns all 46 drills.

The smoke test catches failures that syntax checks cannot detect, such as a server that starts incorrectly or an API route that no longer returns the expected catalog.

## GHCR workflow

`.github/workflows/ghcr.yml` authenticates with GitHub's built-in token, generates image tags and labels, configures QEMU and Buildx, and publishes a multi-platform image.

The workflow needs:

```yaml
permissions:
  contents: read
  packages: write
```

No personal access token should be committed to the repository.

## Inspect runs

```bash
gh run list --repo iamrichmack111/deploy-vault
gh run watch --repo iamrichmack111/deploy-vault
```

View a failed run:

```bash
gh run view RUN_ID --log-failed
```

## Package visibility

New GHCR packages may inherit repository visibility. If a public pull returns `denied`, open the package settings on GitHub and confirm that the package is public or grants access to the repository.

## Release checklist

- Run `npm test` locally.
- Start the application and check `/api/health`.
- Confirm the drill count is 46.
- Review changed screenshots and demo media.
- Push to `main`.
- Wait for CI and GHCR workflows.
- Pull the published tag on a clean system.
- Confirm README badges and package links.

