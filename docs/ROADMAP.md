# DeployVault Roadmap

The authoritative roadmap is maintained as GitHub Issues with the `roadmap`
label. The definitions under `.github/roadmap-issues/` make the backlog
reviewable in pull requests and reproducible across repository setup.

## Priority 1 — Foundation

- Import and export versioned scenario packs
- Backup and restore local training progress
- Facilitator mode for team incident exercises
- WCAG 2.2 AA accessibility pass
- Playwright end-to-end CI matrix
- SBOM, image signing, provenance, and vulnerability scanning

## Priority 2 — Product expansion

- Optional local-LLM response coach
- Kubernetes version profiles
- Installable offline Progressive Web App
- Training analytics and skill-gap reports
- Mobile and tablet layout improvements
- Advanced scenario authoring and validation studio

## Priority 3 — Longer-term research

- Localized interface and scenario translations
- Optional self-hosted team progress service

## Publish the backlog

The publisher is idempotent: it creates labels, skips issues with an exact
existing title, and creates only missing roadmap items.

```bash
./scripts/publish-roadmap-issues.sh
```

Use another repository:

```bash
./scripts/publish-roadmap-issues.sh owner/repository
```

## Roadmap principles

1. Keep local, account-free training as the default.
2. Never execute learner commands or silently access a real cluster.
3. Prefer optional adapters over mandatory hosted services.
4. Treat imported content and model output as untrusted.
5. Preserve deterministic grading when advanced coaching is unavailable.
6. Make privacy, accessibility, and supply-chain security release criteria.

