---
title: "Feature: Optional local-LLM response coach"
labels: "enhancement,roadmap,priority:P2,area:training"
---

## Problem

The deterministic grader is fast and private but cannot provide nuanced feedback
on reasoning, tradeoffs, or communication quality.

## Proposed improvement

Add an optional adapter for a user-configured local model endpoint. The existing
heuristic grader must remain the default and fully functional offline.

## Acceptance criteria

- Disabled by default with no network requests until explicitly configured.
- Support a configurable OpenAI-compatible or Ollama-style local endpoint.
- Send only the active fictional scenario and submitted response.
- Display exactly what data will be transmitted before enabling the adapter.
- Require structured JSON feedback with rubric scores and coaching notes.
- Enforce timeouts, response-size limits, and schema validation.
- Fall back cleanly to deterministic grading on any failure.
- Clearly label model feedback as advisory.

## Security considerations

Never read kubeconfig, environment secrets, browser storage unrelated to the
active drill, or files from the host.

