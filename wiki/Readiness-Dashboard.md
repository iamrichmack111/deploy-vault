# Readiness Dashboard

![DeployVault readiness dashboard](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/wiki-dashboard.png)

The dashboard answers three questions: how much training has been completed, how strong were the responses, and what should be practiced next?

## Headline metrics

| Metric | Meaning |
|---|---|
| Drills cleared | Scenarios with a successful graded response |
| Average score | Mean of the saved best scores |
| Total attempts | Number of submitted lab, interview, and exam responses |
| Drills remaining | Built-in and custom drills not yet cleared |

## Readiness calculation

Readiness combines completion and score quality:

- 60 percent of the measure comes from the percentage of drills completed.
- 40 percent comes from the average saved score.

This prevents a learner from reaching full readiness by rushing through low-quality answers. It also prevents a small number of perfect answers from hiding a large unpracticed category.

## Category mastery

Each category bar compares cleared scenarios with the total scenarios in that category. A low bar is a useful study signal, not a performance judgment. Category mastery makes broad gaps visible—for example, a learner may be strong with pod failures but have little practice with RBAC, storage, or control-plane behavior.

## Recommended next

Recommendations are sorted using saved miss counts and completion status. A failed response increases the miss count. A later successful response reduces it. This produces a lightweight adaptive queue without a server-side profile or machine-learning service.

## Using the dashboard for a training plan

### Fifteen-minute daily practice

1. Open the first recommended incident.
2. Investigate for five minutes.
3. Submit and review the rubric.
4. Repeat it once in Interview mode.
5. Record one prevention measure in the runbook.

### Weekly team session

1. Select one low-mastery category.
2. Complete two incidents individually.
3. Compare investigation order and evidence.
4. Discuss rollback, verification, and prevention.
5. Add a custom scenario based on an internal postmortem.

### Interview preparation

1. Clear one incident in each major category.
2. Practice ninety-second answers in Interview mode.
3. Run a ten-incident exam.
4. Revisit any category below the target score.

Read [Grading and Scoring](Grading-and-Scoring) to understand how responses change readiness.
