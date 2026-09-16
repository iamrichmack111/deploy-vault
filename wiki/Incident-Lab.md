# Incident Lab

![Incident investigation workspace](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/incident-lab.png)

The Incident Lab is the primary deliberate-practice environment. It presents enough evidence to reason about a failure while requiring the learner to choose an investigation sequence.

## Read before typing

Start with the brief, symptoms, and objectives. A strong engineer does not begin with random commands. Determine:

- the affected workload, namespace, or user path;
- whether the symptom is availability, correctness, latency, scheduling, or security;
- the most recent change or rollout;
- the layer where evidence should be collected first; and
- the risk of taking action before the cause is confirmed.

## Request-path topology

The topology is a compact mental model rather than a live cluster graph. For traffic failures, trace from the outside inward. For crash or scheduling failures, begin at the workload and node layers. For control-plane failures, distinguish the desired state held by the API from containers already running on worker nodes.

## Investigation pattern

A reusable investigation order is:

1. `kubectl get` to establish state and scope.
2. `kubectl describe` to inspect conditions and recent events.
3. `kubectl logs` and `kubectl logs --previous` for runtime evidence.
4. Object-specific inspection such as endpoints, PVCs, node conditions, probes, RBAC, or rollout history.
5. A safe remediation plan with rollback and verification.

Do not treat this as a rigid checklist. The correct first command depends on the symptom. A 502 after deployment points toward ingress, service endpoints, readiness, and application logs; a Pending pod points toward scheduling events, affinity, taints, PVCs, quotas, and image architecture.

## Hints and score

Hints are progressive. Each hint subtracts ten points from the incident score, down to a minimum of forty. The penalty encourages independent reasoning but keeps help available. Use the first hint when the investigation has stopped producing new evidence, not simply because the answer is not immediate.

## Root-cause response

Write the response as an operational handoff:

```text
Impact and scope
Evidence and commands
Root cause
Immediate remediation
Verification and rollback
Long-term prevention
```

This structure performs well in production postmortems and technical interviews because it separates observation from conclusion.

## Case-study debrief

After grading, expand the case study. Compare the debrief with your own investigation: Did you inspect the correct object first? Did your remediation address the cause? Did you include a safe verification step? Save the strongest reusable details in Personal Runbook Notes.

