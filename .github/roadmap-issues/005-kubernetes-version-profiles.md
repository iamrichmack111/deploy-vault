---
title: "Feature: Kubernetes version profiles for scenario output"
labels: "enhancement,roadmap,priority:P2,area:training"
---

## Problem

Kubernetes commands, fields, defaults, and operational recommendations change
over time. A single fixture set cannot explain version-sensitive behavior.

## Proposed improvement

Allow scenarios to declare supported Kubernetes version profiles and show the
selected version in the lab.

## Acceptance criteria

- Add a global version selector with a clearly documented default.
- Allow scenario commands or debrief notes to vary by version.
- Warn when a scenario has no profile for the selected version.
- Keep a shared baseline to avoid duplicating entire scenarios.
- Add tests for profile fallback and version-specific output.
- Document the source and review date for version-sensitive claims.
- Do not imply exact emulation of a real cluster version.

## Initial scope

Start with the current supported Kubernetes minor versions and the areas most
likely to differ: API resources, autoscaling, networking, security defaults,
and deprecated fields.

