---
title: "Quality: Add Playwright end-to-end CI matrix"
labels: "testing,roadmap,priority:P1,area:platform"
---

## Goal

Protect the complete user workflow with browser-level tests rather than relying
only on syntax and API smoke tests.

## Acceptance criteria

- Test dashboard rendering and 46-drill loading.
- Test search, category, and difficulty filters.
- Run a terminal command and validate output.
- Submit a response and validate rubric and saved progress.
- Test Interview, Study, and Exam navigation.
- Create a custom scenario and confirm persistence.
- Test runbook save and export.
- Capture traces and screenshots only on failure.
- Run at least Chromium in pull requests and an expanded browser matrix on main.
- Keep CI runtime and artifact retention bounded.

## Reliability

Tests must wait on application state or health endpoints rather than fixed sleeps
where possible. Use isolated browser contexts to prevent state leakage.

