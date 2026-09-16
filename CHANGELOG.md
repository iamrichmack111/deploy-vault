# Changelog

All notable changes to DeployVault are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Scenario-pack import and export
- Progress backup and restore
- Facilitator mode for team exercises
- Optional local-LLM response coaching
- Kubernetes version profiles
- Accessibility and localization improvements
- Signed containers, SBOMs, and build provenance

The complete planned backlog is maintained as GitHub Issues with the `roadmap`
label.

## [1.1.0] - 2026-09-16

### Added

- Sixteen-page illustrated GitHub Wiki with sidebar and footer navigation
- SSH-based idempotent Wiki publishing script
- Seven-minute, fifteen-chapter Playwright walkthrough
- High-quality Piper `en_US-ryan-high` narration pipeline
- Scene-synchronized narration timing and chapter overlays
- Dedicated Wiki dashboard image to avoid stale README preview caching
- Detailed GitHub SSH setup and troubleshooting documentation
- Roadmap issue definitions and automated issue publisher
- Transparent project development history

### Changed

- Expanded the README with video chapters and full documentation links
- Updated GitHub initialization to reuse the active authenticated SSH session
- Improved demo validation with representative-frame inspection
- Excluded voice models, raw captures, and temporary demo artifacts from Git

### Fixed

- Removed duplicate GitHub authentication and SSH-key creation behavior
- Corrected the README demo image that displayed a `Not Found` response
- Fixed the demo recorder's final-scene cleanup
- Repaired narration scene WAV concatenation validation

## [1.0.0] - 2026-09-15

### Added

- Zero-dependency Python application server
- Responsive Kubernetes readiness dashboard
- Forty-six production-style Kubernetes incident drills
- Search, category filters, difficulty filters, and Smart Practice
- Incident topology, symptoms, objectives, and simulated kubectl terminal
- Command suggestions, Tab completion, command history, help, and clear
- Progressive hints with score penalties
- Five-part response grading rubric
- Personal runbook notes and Markdown export
- Case-study debriefs
- Timed Interview mode with optional browser speech recognition
- Spaced-repetition Study mode
- Randomized ten-incident Exam mode
- Browser-persistent progress and custom scenarios
- macOS, Linux, and Windows desktop installers and native icons
- Non-root Docker image
- Multi-architecture GHCR publication for AMD64 and ARM64
- CI validation, API health check, and drill-count smoke test
- Editable D2 architecture, training-process, and delivery diagrams
- README badges, screenshots, installation instructions, and project topics

[Unreleased]: https://github.com/iamrichmack111/deploy-vault/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/iamrichmack111/deploy-vault/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/iamrichmack111/deploy-vault/releases/tag/v1.0.0

