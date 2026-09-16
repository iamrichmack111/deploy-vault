---
title: "Quality: Complete WCAG 2.2 AA accessibility pass"
labels: "accessibility,roadmap,priority:P1,area:ux"
---

## Goal

Make every DeployVault workflow usable with a keyboard, screen reader, zoom,
reduced motion, and high-contrast preferences.

## Acceptance criteria

- Complete all training modes without a mouse.
- Add visible focus states and logical focus movement after view changes.
- Add accessible names and descriptions for timers, scores, topology, and bars.
- Announce terminal output, grading results, timer expiry, and saved notes.
- Preserve meaning without relying on color alone.
- Meet contrast requirements at 200 percent zoom.
- Respect `prefers-reduced-motion`.
- Validate with automated tooling and at least one screen reader on macOS or Linux.
- Document remaining limitations.

## Test targets

Dashboard, incident navigation, terminal entry, hints, response grading,
interview timer, study reveal/rating, exam progression, custom dialog, and reset
confirmation must all be included.

