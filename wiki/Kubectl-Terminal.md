# Simulated Kubectl Terminal

![DeployVault terminal inside the incident lab](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/incident-lab.png)

The terminal teaches command selection and evidence interpretation without executing a shell. Supported command patterns are matched against the active incident, and the corresponding fictional cluster output is displayed.

## Terminal capabilities

- Scenario-specific `kubectl` output
- Suggested investigation commands
- Direct command entry
- Tab completion for supported commands
- Up and Down arrow command history
- `help` to list commands for the scenario
- `clear` to reset output

## Why simulation is useful

A static answer key teaches recognition. A terminal interaction teaches sequencing. The learner must decide which object to inspect, interpret the returned evidence, and connect it to the next command. Because no command reaches a real cluster, destructive syntax is harmless and credentials are unnecessary.

## Common investigation commands

| Goal | Command pattern |
|---|---|
| List workload state | `kubectl get pods -A` |
| Inspect conditions and events | `kubectl describe pod POD -n NAMESPACE` |
| Read current logs | `kubectl logs POD -n NAMESPACE` |
| Read the prior crashed container | `kubectl logs POD -n NAMESPACE --previous` |
| Review a rollout | `kubectl rollout status deployment/APP` |
| Compare revisions | `kubectl rollout history deployment/APP` |
| Inspect service routing | `kubectl get svc,endpoints,endpointslices` |
| Inspect scheduling | `kubectl get events --sort-by=.lastTimestamp` |
| Inspect node health | `kubectl describe node NODE` |
| Check authorization | `kubectl auth can-i VERB RESOURCE --as=system:serviceaccount:NS:SA` |

The exact commands available differ by scenario. Type `help` when you want to see the supported set without spending a hint.

## Command interpretation

Do not stop after seeing an error string. Connect it to Kubernetes state:

- `CrashLoopBackOff` is a retry condition, not the root cause. Read current and previous logs and inspect configuration or startup behavior.
- A Service with no endpoints usually indicates selector mismatch, failed readiness, or no matching pods.
- `Pending` does not always mean insufficient CPU. Events may reveal PVC binding, taints, affinity, quotas, architecture, or image-pull prerequisites.
- `Forbidden` identifies an authorization failure. Determine the service account, verb, API group, resource, and namespace.
- `OOMKilled` points to memory exhaustion or a limit, while CPU limits usually create throttling rather than termination.

## Safety boundary

The browser never invokes `kubectl`, a shell, Docker, or Kubernetes client libraries. Output comes from scenario data in the repository. This makes the terminal appropriate for offline training and demonstrations.

