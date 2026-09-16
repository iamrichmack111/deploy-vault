# Custom Scenarios and Runbooks

![DeployVault incident workspace](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/incident-lab.png)

Custom scenarios convert organization-specific incidents into safe practice. Personal runbooks convert practice into reusable operational memory.

## Create a custom scenario

Select **Custom Scenario** from the incident bank and provide:

- a concise incident title;
- a category;
- the production brief or user-visible symptom;
- the expected diagnosis; and
- the remediation.

DeployVault assigns a local identifier and supplies a baseline investigation surface. The new scenario appears immediately in the incident bank and persists in browser storage.

## Writing a useful scenario

A strong scenario includes uncertainty. Avoid putting the root cause directly in the brief.

Weak brief:

```text
The expired certificate is causing requests to fail.
```

Better brief:

```text
Internal requests began failing with TLS errors shortly after midnight.
Pods are Running and the Service still has endpoints.
```

The expected diagnosis can then name the expired mounted certificate, while remediation describes rotation, safe rollout, validation, and recurrence monitoring.

## Turning a postmortem into a drill

1. Remove confidential names, credentials, customer data, and internal addresses.
2. Preserve the symptom timeline and misleading signals.
3. Choose three to five commands that revealed the cause.
4. Describe the exact technical cause.
5. Include the immediate recovery and rollback decision.
6. Add the prevention control from the postmortem.
7. Test the scenario with an engineer who did not handle the original incident.

## Personal runbook notes

Each incident includes a note field. Useful notes contain:

- the fastest scoping command;
- evidence that distinguishes similar failures;
- a safe recovery command or procedure;
- rollback conditions;
- verification checks;
- monitoring or alerting gaps; and
- a link or owner to consult in a real environment.

## Markdown export

Select **Export Runbook** to download saved notes as Markdown. The export groups notes by incident title and can be committed to a documentation repository or imported into a knowledge base.

Before sharing an exported runbook, remove cluster names, internal URLs, credentials, tokens, account identifiers, and sensitive postmortem details.

## Team exercise format

For a thirty-minute drill:

1. Five minutes: read the scenario and clarify scope.
2. Ten minutes: investigate independently.
3. Five minutes: present diagnosis and recovery.
4. Five minutes: compare with the debrief.
5. Five minutes: record one runbook improvement and one prevention action.

