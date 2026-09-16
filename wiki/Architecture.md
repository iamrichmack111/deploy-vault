# Architecture

![DeployVault architecture](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/architecture.svg)

DeployVault uses a deliberately small architecture so that the trainer is fast to install, easy to audit, and reliable on modest hardware.

## Components

| Component | Responsibility |
|---|---|
| `app.py` | Python HTTP server, static delivery, health endpoint, and drill API |
| `data/` | Forty-six fictional Kubernetes incident definitions |
| `static/index.html` | Application shell and accessible interface structure |
| `static/app.js` | Views, simulation, grading, persistence, study, interview, and exam behavior |
| `static/styles.css` | Responsive visual system and animations |
| Browser local storage | Progress, scores, attempts, misses, notes, and custom scenarios |
| `media/` | Screenshots, rendered diagrams, and narrated demo |

## Request flow

1. Python serves the application shell and static assets.
2. The browser requests `/api/drills`.
3. Python returns scenario JSON.
4. JavaScript renders the incident bank and dashboard.
5. User commands are matched locally against the active incident's supported command map.
6. Progress and notes are persisted in local storage.

There is no database, task queue, external API, Kubernetes client, authentication service, or telemetry dependency.

## Simulation boundary

The terminal does not pass input to the operating system. It normalizes the text and compares it with supported command prefixes. Matching commands return fixture output; unsupported commands return a training message. This is the primary security boundary.

## Data model

Each scenario contains:

- identifier, title, category, and difficulty;
- incident brief;
- observed symptoms and objectives;
- supported commands and outputs;
- progressive hints;
- diagnosis and remediation;
- case-study debrief.

Custom scenarios use the same browser-side shape with a small default command set.

## Design tradeoffs

### Benefits

- immediate startup;
- offline use;
- no dependency installation at runtime;
- easy containerization;
- small attack surface;
- deterministic demonstrations.

### Boundaries

- command output is finite rather than dynamically generated;
- local storage does not synchronize across devices;
- the grader is heuristic rather than model-based;
- authentication is intentionally absent from the local trainer;
- simulations do not reproduce every version-specific Kubernetes detail.

## Editable diagrams

The source diagrams are maintained in `docs/d2/`:

- `architecture.d2`
- `training-process.d2`
- `delivery-pipeline.d2`

Run `scripts/render-d2.sh` after editing them.

