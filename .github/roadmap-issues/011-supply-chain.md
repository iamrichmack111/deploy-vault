---
title: "Security: Add SBOM, signing, provenance, and image scanning"
labels: "security,roadmap,priority:P1,area:platform"
---

## Goal

Strengthen the GHCR release pipeline with verifiable software-supply-chain
metadata and automated vulnerability reporting.

## Acceptance criteria

- Generate SPDX or CycloneDX SBOMs for release images.
- Attach SBOMs to the image or release artifacts.
- Sign GHCR images using keyless GitHub OIDC where practical.
- Produce build provenance attestations.
- Scan the final image for operating-system and application vulnerabilities.
- Fail releases on an agreed severity policy with documented exceptions.
- Pin third-party GitHub Actions to reviewed versions or commit SHAs.
- Publish verification commands in the Wiki.
- Avoid long-lived signing secrets.

## Notes

The current image is intentionally small and non-root, but minimal size does not
replace provenance, dependency visibility, or continuous scanning.

