# Contributing

![DeployVault delivery process](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/media/delivery-pipeline.svg)

Contributions should preserve DeployVault's core qualities: safe simulation, clear operational reasoning, offline use, low setup cost, and deterministic behavior.

## Development setup

```bash
git clone git@github.com:iamrichmack111/deploy-vault.git
cd deploy-vault
./start.sh
```

Run validation:

```bash
npm test
```

## Add or improve a scenario

A scenario should include:

- a realistic symptom rather than the answer;
- a clear category and difficulty;
- two or more observed symptoms;
- investigation objectives;
- several relevant commands with plausible output;
- progressive hints;
- a precise diagnosis;
- safe remediation and verification; and
- a production-style case study.

Avoid commands or evidence that rely on one vendor unless the scenario is explicitly vendor-specific. Use fictional namespaces, workloads, domains, and identifiers.

## Quality checklist

- The first command is relevant to the symptom.
- Events and logs are internally consistent.
- The diagnosis explains every major symptom.
- Remediation addresses the cause.
- Stateful and data-loss risks are called out.
- Verification includes more than pod phase.
- Prevention is actionable.
- No real credentials, cluster names, or confidential incident details appear.

## Front-end changes

Maintain keyboard access, readable contrast, responsive layout, and offline operation. Do not introduce a runtime framework or package without a clear benefit that outweighs the increased build and maintenance cost.

## Documentation changes

Update the relevant wiki source under `wiki/`, keep a meaningful image on each page, and verify all internal page links. Publish with:

```bash
./scripts/publish-wiki.sh
```

## Pull requests

Include:

- the problem being solved;
- the user-visible behavior;
- validation performed;
- screenshots for interface changes;
- scenario evidence for training-content changes; and
- any compatibility or security considerations.

CI must pass before merge. Container publication occurs from the configured main-branch workflow.

## Security

Do not add code that executes learner commands, reads kubeconfig automatically, collects credentials, or silently connects to a cluster. A proposal for live-cluster integration should be a separate, explicitly authorized mode with a documented threat model and least-privilege design.

