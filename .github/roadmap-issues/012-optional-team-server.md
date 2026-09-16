---
title: "Research: Optional self-hosted team progress service"
labels: "research,roadmap,priority:P3,area:platform"
---

## Problem

Browser-local progress is ideal for private individual training but does not
support opt-in team rosters, shared assignments, or facilitator reporting.

## Research goal

Design an optional self-hosted service without weakening the zero-account,
offline default experience.

## Questions to answer

- What is the minimum data model for users, assignments, attempts, and reports?
- Can local-first operation synchronize without losing offline capability?
- What authentication method fits small internal deployments?
- How are retention, deletion, export, and administrator access handled?
- How are runbook notes protected from unnecessary collection?
- Can the server be a separate package so the core app remains dependency-free?

## Exit criteria

- Architecture decision record with threat model and privacy analysis.
- Proposed API and storage schema.
- Migration and deletion strategy.
- Clear non-goals and operational cost estimate.
- Prototype only after the design is reviewed.

