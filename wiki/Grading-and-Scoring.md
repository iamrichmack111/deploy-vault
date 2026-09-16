# Grading and Scoring

![A graded incident response](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/incident-lab.png)

DeployVault grades the structure of an operational response. The goal is not to reward a single memorized phrase; it is to reinforce the components required to diagnose and recover from a production incident safely.

## Five grading dimensions

| Dimension | What a strong response contains |
|---|---|
| Investigation | A logical path through relevant Kubernetes objects and evidence |
| Commands | Concrete commands such as `get`, `describe`, `logs`, `rollout`, `exec`, or `curl` |
| Root cause | The exact failed configuration, dependency, controller behavior, or runtime condition |
| Remediation | A correction that addresses the cause rather than hiding the symptom |
| Risk and prevention | Impact awareness, rollback, verification, monitoring, and a recurrence control |

Each dimension is displayed as Strong, Partial, or Missing. The response score is combined with remaining incident points after hints or answer reveals.

## A strong response pattern

```text
I would first confirm the scope with kubectl get and inspect the affected
object with kubectl describe, recent events, and current or previous logs.
The evidence indicates [exact cause]. I would [safe remediation], then verify
[rollout/readiness/logs/traffic]. If recovery fails, I would [rollback]. To
prevent recurrence, I would add [validation, policy, alert, test, or runbook].
```

Replace every bracketed section with incident-specific details. Generic answers may earn credit for process, but they should not receive full root-cause or remediation credit.

## Score deductions

- Each progressive lab hint costs ten points.
- Revealing the model answer in Interview mode costs twenty points.
- Scores have a floor of forty so an assisted attempt still contributes to learning.
- Failed responses increase the scenario's miss weight in Smart Practice.

## Successful completion

A response that meets the resolution threshold marks the incident cleared. DeployVault keeps the best saved score, reduces the miss count, updates the category mastery bar, and recalculates readiness.

## Using the rubric during interviews

A concise senior-level answer normally follows this order:

1. State impact and scope.
2. Name the first two or three checks.
3. Explain what evidence would distinguish likely causes.
4. Give the safest remediation and rollback.
5. Explain how recovery will be verified.
6. Add one durable prevention measure.

This structure signals judgment. Interviewers are usually evaluating whether the candidate can reduce uncertainty, protect production, communicate risk, and avoid changing several variables at once.

## Limitations

The grader is intentionally lightweight and local. It uses command and keyword evidence rather than a hosted language model. Treat the score as coaching feedback, not an authoritative evaluation of engineering ability. Compare the response with the model answer and case study for context.

