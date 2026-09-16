# Roadmap and Releases

![DeployVault delivery pipeline](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/delivery-pipeline.svg)

DeployVault uses Semantic Versioning, a Keep a Changelog release record, and
GitHub Issues for planned improvements.

## Current releases

| Version | Date | Summary |
|---|---|---|
| 1.0.0 | September 15, 2026 | Initial 46-incident trainer, desktop delivery, container, CI/CD, and diagrams |
| 1.1.0 | September 16, 2026 | Narrated demo, illustrated Wiki, SSH workflow, changelog, and roadmap |

Read the repository [CHANGELOG](https://github.com/iamrichmack111/deploy-vault/blob/main/CHANGELOG.md)
for the complete Added, Changed, and Fixed sections.

## Roadmap priorities

### Priority 1

- Scenario-pack import and export
- Progress backup and restore
- Team facilitator mode
- WCAG 2.2 AA accessibility
- Playwright end-to-end CI
- SBOM, signing, provenance, and image scanning

### Priority 2

- Optional local-LLM response coaching
- Kubernetes version profiles
- Progressive Web App installation
- Analytics and skill-gap export
- Mobile and tablet layouts
- Advanced scenario authoring

### Priority 3

- Localization
- Optional self-hosted team service research

View the live [roadmap issue list](https://github.com/iamrichmack111/deploy-vault/issues?q=is%3Aissue+label%3Aroadmap).

## Publish missing roadmap issues

```bash
./scripts/publish-roadmap-issues.sh
```

The publisher creates required labels, checks open and closed issues, and skips
an exact title that already exists.

## Release integrity

Commit and tag dates should represent when the Git objects were actually
created. When an authentic older snapshot is imported, preserve its verified
timestamp and document the evidence. Do not manufacture activity or place an
old release tag on source that did not exist at that milestone.

