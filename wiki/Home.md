# DeployVault Documentation

![DeployVault readiness dashboard](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/wiki-dashboard.png)

DeployVault is an offline-capable Kubernetes incident simulator, interview trainer, and readiness dashboard. It recreates realistic production symptoms and command output without connecting to a live cluster. Engineers can practice investigation, diagnosis, remediation, verification, and prevention without risking an application or infrastructure environment.

## What DeployVault teaches

DeployVault is structured around the way experienced platform engineers approach an outage:

1. Establish the scope and user impact.
2. Inspect the relevant Kubernetes objects.
3. Read events and current or previous container logs.
4. Trace traffic and dependencies layer by layer.
5. Identify the exact root cause rather than treating the symptom.
6. Choose a safe, reversible remediation.
7. Verify recovery with readiness, rollout, logs, metrics, and user traffic.
8. Record a prevention measure in the runbook.

The trainer includes **46 incidents** across pods, deployments, services, ingress, DNS, network policies, storage, nodes, scheduling, resources, probes, RBAC, security, autoscaling, disruption budgets, etcd, and control-plane availability.

## Major capabilities

| Capability | Purpose |
|---|---|
| Readiness dashboard | Measures completion, scores, attempts, and category mastery |
| Incident lab | Presents symptoms, objectives, topology, terminal output, and diagnosis workspace |
| Smart Practice | Prioritizes missed, weak, and unfinished scenarios |
| Interview mode | Adds a timer, typed or spoken answers, grading, and model responses |
| Study mode | Uses reveal-and-rate spaced repetition |
| Exam mode | Runs a randomized ten-incident assessment without hints |
| Custom scenarios | Turns internal incidents and postmortems into reusable drills |
| Personal runbooks | Saves notes and exports them as Markdown |
| Desktop installer | Supports macOS, Linux, and Windows user-level installation |
| Container delivery | Publishes non-root AMD64 and ARM64 images to GHCR |

## Choose your path

- New user: begin with [Getting Started](Getting-Started).
- Evaluating the application: follow the [Product Tour](Product-Tour).
- Preparing for interviews: read [Interview, Study and Exam](Interview-Study-and-Exam).
- Running team training: use [Custom Scenarios and Runbooks](Custom-Scenarios-and-Runbooks).
- Reviewing engineering design: open [Architecture](Architecture).
- Deploying the project: use [Containers, GHCR and CI/CD](Containers-GHCR-and-CI-CD).

## Safety model

DeployVault does not execute submitted terminal commands. Commands are matched against fictional incident fixtures, and predefined evidence is returned. There are no kubeconfig reads, cluster credentials, cloud credentials, shell execution paths, or write operations against Kubernetes. The design makes it appropriate for laptops, interview practice, classrooms, and internal workshops.

> DeployVault is a training tool. It improves troubleshooting habits, but production changes should still follow your organization's access controls, review process, change management, and rollback procedures.
