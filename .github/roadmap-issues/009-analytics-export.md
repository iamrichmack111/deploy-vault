---
title: "Feature: Export training analytics and skill-gap reports"
labels: "enhancement,roadmap,priority:P2,area:training"
---

## Problem

The dashboard communicates readiness visually, but learners and facilitators
cannot export structured progress for review or training plans.

## Proposed improvement

Add local CSV and Markdown reports for category mastery, attempts, scores,
misses, completion, and recommended next topics.

## Acceptance criteria

- Export CSV with one row per scenario.
- Export a readable Markdown readiness report.
- Include generation time, app version, and calculation definitions.
- Allow notes to be excluded by default.
- Clearly mark custom scenarios.
- Provide category totals and weak-area recommendations.
- Add deterministic tests for calculations and escaping.
- Keep all report generation inside the browser.

## Privacy

Reports may reveal training weaknesses and user-authored notes. Show a content
summary before download and never upload reports automatically.

