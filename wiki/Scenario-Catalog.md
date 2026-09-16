# Scenario Catalog

![DeployVault training process](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/training-process.svg)

DeployVault contains 46 production-style drills. The catalog spans the failure domains commonly discussed in Kubernetes interviews and encountered during platform operations.

## Pods and lifecycle

- Pod stuck in `Terminating`
- `CrashLoopBackOff` investigation
- Previous-container log retrieval
- Force deletion risks and finalizers
- Application failure versus platform failure

Key objects and evidence include pod phase, container state, restart count, exit code, termination reason, events, finalizers, deletion timestamp, node state, runtime state, mounted volumes, and graceful shutdown behavior.

## Deployments and rollouts

- Successful rollout followed by 502 responses
- Rollout stuck or progressing too slowly
- Downtime despite two replicas
- `maxUnavailable` and `maxSurge`
- Rollback versus roll forward

These drills emphasize readiness, endpoint population, rollout strategy, termination timing, capacity during surge, incompatible configuration, and revision history.

## Services, ingress, DNS, and network policy

- Healthy pods with no reachable endpoints
- Internal service connection failures
- Internal DNS failure with working external DNS
- Ingress controller receives traffic but the application does not
- NetworkPolicy blocks database communication
- Distinguishing application and Kubernetes networking failures

The investigation path covers labels and selectors, EndpointSlices, ports and target ports, readiness, namespaces, fully qualified service names, CoreDNS, ingress rules, controller logs, backend health, and ingress/egress policy pairs.

## Scheduling and nodes

- Pod remains Pending despite free CPU and memory
- Node becomes `NotReady`
- Taints and tolerations
- Node selectors and affinity
- Safe node drain and refused evictions
- PodDisruptionBudget interference with maintenance

These drills cover node conditions, kubelet and runtime health, disk and PID pressure, PVC topology, host ports, image architecture, quotas, anti-affinity, daemon-managed pods, local data, and disruption constraints.

## Resources, probes, and autoscaling

- Requests, limits, `OOMKilled`, and CPU throttling
- Readiness, liveness, and startup probe outages
- HPA not scaling
- Metrics Server unavailable

The scenarios distinguish scheduling guarantees from runtime enforcement and explain why an unhealthy autoscaling signal or aggressive probe can create a secondary outage.

## Storage and stateful workloads

- PVC stuck Pending
- StatefulSet versus Deployment
- Database identity, ordering, and stable storage
- Volume detach and termination behavior

Investigation includes StorageClass, access modes, dynamic provisioning, topology constraints, volume attachments, claims, reclaim policy, and stateful shutdown safety.

## Configuration, secrets, RBAC, and security

- ConfigMap change behavior
- Zero-downtime Secret rotation
- ServiceAccounts and RBAC
- Forbidden Kubernetes API calls
- Risks of application `cluster-admin`
- Security contexts versus API authorization

The response should distinguish mounted-volume updates from environment variables, runtime identity from authorization policy, and container privileges from Kubernetes API permissions.

## Control plane and resilience

- etcd contents and backup importance
- API server unavailable while workers remain operational
- Single control-plane failure in a highly available cluster
- PodDisruptionBudget limitations

These drills focus on desired state, reconciliation, quorum, already-running workloads, new scheduling limitations, and the difference between voluntary and involuntary disruption.

Use category filters on the dashboard to build a focused session around any section above.

