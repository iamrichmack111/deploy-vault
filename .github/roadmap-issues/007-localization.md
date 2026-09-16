---
title: "Feature: Localized interface and scenario translations"
labels: "enhancement,roadmap,priority:P3,area:ux"
---

## Problem

Interface strings and incident content are embedded in English, making consistent
translation and review difficult.

## Proposed improvement

Introduce a small localization layer for interface text and a documented format
for translated scenario content.

## Acceptance criteria

- Move user-facing interface strings into locale dictionaries.
- Add a locale selector with browser-language fallback.
- Keep English as the authoritative fallback.
- Support translated titles, briefs, symptoms, objectives, hints, and debriefs.
- Preserve Kubernetes commands and object names without unsafe translation.
- Detect missing keys during CI.
- Document translator workflow and terminology guidance.
- Include one complete reference translation before release.

## Design consideration

The implementation should remain framework-free and must not require a hosted
translation service at runtime.

