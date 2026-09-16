# Product Tour

![DeployVault incident lab](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/incident-lab.png)

The interface is organized into a persistent incident bank, top-level training modes, and a focused workspace. A learner can move between deliberate practice and assessment without loading a different application.

## Header navigation

| View | Use it for |
|---|---|
| Dashboard | Progress review, mastery analysis, and recommended practice |
| Lab | Untimed investigation with terminal, hints, grading, notes, and debrief |
| Interview | Ninety-second verbal or written incident responses |
| Study | Spaced-repetition review of diagnosis and remediation |
| Exam | Ten randomized incidents with sixty-second timers and no hints |

The header also shows the current readiness percentage. This value combines completion and answer quality; it is not merely the percentage of buttons clicked.

## Incident bank

The left panel remains available in every major view. Search matches scenario titles, descriptions, and categories. Category and difficulty filters can be combined, which is useful for focused sessions such as advanced networking or intermediate storage.

Each incident card shows:

- category;
- title;
- difficulty;
- open or cleared status;
- best score; and
- number of attempts.

**Smart Practice** chooses from the filtered pool, weighting unfinished scenarios and past misses more heavily. **Custom Scenario** opens the authoring dialog. **Clear Saved Progress** resets progress only after confirmation.

## Incident workspace

An incident includes a title, short production brief, category and difficulty badges, attempt count, live score, request-path topology, observed symptoms, and mission objectives. Below that are the terminal and root-cause response areas.

The topology follows a common request path:

`Client → Ingress → Service → Endpoint → Pod → Container`

The suspected layer changes with the scenario category. This provides direction while still requiring the learner to gather evidence.

## Persistent learning tools

Every scenario has runbook notes and a case-study debrief. Notes can be saved between sessions and exported to a Markdown file. The debrief explains the operational context behind the incident so that the learner understands the failure pattern rather than memorizing a command.

## Recommended workflow

```text
Dashboard → Smart Practice → Investigate → Grade → Debrief
          → Interview → Study → Exam → Dashboard
```

For a deeper explanation of each surface, continue with [Readiness Dashboard](Readiness-Dashboard) and [Incident Lab](Incident-Lab).

