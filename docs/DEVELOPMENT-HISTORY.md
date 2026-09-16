# Development History

This file records the known DeployVault milestones using their actual project
dates. It does not rewrite Git timestamps or manufacture historical activity.

## September 15, 2026 — Initial application

The first complete release established the lightweight architecture and core
training workflow:

- Python application server with no runtime package dependencies
- Forty-six Kubernetes incident fixtures
- Dashboard, Lab, Interview, Study, and Exam modes
- Simulated kubectl investigation and response grading
- Runbook notes, case studies, custom scenarios, and local persistence
- Cross-platform desktop installation
- Docker, GHCR, GitHub Actions, D2 diagrams, screenshots, and badges

This milestone is represented by release `v1.0.0`.

## September 16, 2026 — Documentation and media expansion

The second milestone made the project ready for portfolio review, onboarding,
and public demonstration:

- Detailed narrated Playwright walkthrough
- Piper voice synthesis and synchronized chapter timing
- Complete illustrated GitHub Wiki
- Improved SSH-only GitHub workflow
- Demo preview repair and media validation
- Roadmap issues and changelog

This milestone is represented by release `v1.1.0`.

## Preserving legitimate earlier work

If authentic earlier snapshots exist, import them without inventing dates:

1. Verify the snapshot contents and original timestamp from an archive,
   filesystem record, release asset, email, or backup.
2. Commit each snapshot in chronological order on an import branch.
3. Set author and committer dates only to the verified historical timestamp.
4. Document the source of the date in the commit message or an import note.
5. Merge the reconstructed branch without changing the current release tags.

Example for a verified snapshot only:

```bash
GIT_AUTHOR_DATE="2026-09-15T14:30:00-04:00" \
GIT_COMMITTER_DATE="2026-09-15T14:30:00-04:00" \
git commit -m "import: verified September 15 application snapshot"
```

Do not use this mechanism to create activity that did not occur.

## Creating truthful release tags

After the corresponding source is committed, create annotated tags with the
current real timestamp:

```bash
git tag -a v1.0.0 -m "DeployVault 1.0.0: initial trainer"
git tag -a v1.1.0 -m "DeployVault 1.1.0: wiki and narrated demo"
git push origin v1.0.0 v1.1.0
```

If the repository no longer contains the exact `v1.0.0` source state, do not
place that tag on the current commit. Locate the matching commit first or tag
only `v1.1.0`.

