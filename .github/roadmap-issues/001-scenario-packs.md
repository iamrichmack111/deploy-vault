---
title: "Feature: Import and export versioned scenario packs"
labels: "enhancement,roadmap,priority:P1,area:training"
---

## Problem

Custom scenarios currently remain in one browser profile. Teams need a safe way
to share sanitized incident exercises and keep them under version control.

## Proposed improvement

Add JSON import and export for one scenario or a named scenario pack. Define a
documented schema version and validate all imported fields before storage.

## Acceptance criteria

- Export one custom scenario or all custom scenarios.
- Import a versioned JSON document through the browser.
- Validate required fields, types, maximum lengths, command maps, and IDs.
- Preview additions, updates, and conflicts before applying them.
- Never evaluate imported HTML, JavaScript, shell, or template syntax.
- Preserve built-in scenarios and existing progress.
- Include a documented example pack and automated validation tests.

## Security considerations

Treat every imported field as untrusted text. Escape output and reject prototype
keys, oversized documents, unsupported schema versions, and duplicate IDs.

