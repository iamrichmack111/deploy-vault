---
title: "Feature: Backup and restore local training progress"
labels: "enhancement,roadmap,priority:P1,area:training"
---

## Problem

Progress is tied to a browser profile and origin. Changing browsers, ports, or
computers can make completed drills and runbook notes appear lost.

## Proposed improvement

Provide an explicit export and restore flow for scores, attempts, misses,
completion state, notes, and custom scenarios.

## Acceptance criteria

- Export a human-readable, versioned JSON backup.
- Offer selective restore for progress, notes, and custom scenarios.
- Show a summary and conflicts before changing local data.
- Create an automatic in-memory rollback point before restore.
- Reject malformed, unsupported, or oversized backups.
- Document that backups may contain user-authored operational notes.
- Add tests for round-trip export, partial restore, and invalid input.

## Privacy

The backup must remain local unless the user deliberately saves or shares it.
Do not add analytics or automatic cloud synchronization.

