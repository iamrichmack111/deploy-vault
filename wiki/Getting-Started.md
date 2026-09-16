# Getting Started

![DeployVault application icon](https://raw.githubusercontent.com/iamrichmack111/deploy-vault/main/assets/deployvault-icon.png)

DeployVault has no runtime package dependencies. Python 3 serves the application and API, while all progress is stored locally in the browser.

## Requirements

- Python 3.9 or newer
- A current browser
- Approximately 50 MB of disk space for the application and demo media
- Git, Docker, Node, Piper, and D2 only when using the optional development workflows

## Start without installing

```bash
cd ~/Downloads/deploy-vault-lite
chmod +x start.sh
./start.sh
```

Open `http://127.0.0.1:8080` if the browser does not open automatically.

Use a different port:

```bash
./start.sh --port 8081
```

Expose the trainer to trusted devices on the local network:

```bash
./start.sh --host 0.0.0.0 --no-browser
```

When using a non-loopback address, rely on the host firewall and a trusted LAN. DeployVault does not include authentication because its default design is local-only training.

## First training session

1. Review **Recommended next** on the dashboard.
2. Open a beginner scenario from the incident bank.
3. Read the symptom and mission objectives before running commands.
4. Inspect two or three relevant objects in the terminal.
5. Write a response containing evidence, root cause, remediation, verification, and prevention.
6. Review the rubric and debrief.
7. Save the strongest commands in Personal Runbook Notes.
8. Repeat the incident in Interview mode using a spoken ninety-second answer.

## Confirm the API

```bash
curl -fsS http://127.0.0.1:8080/api/health
curl -fsS http://127.0.0.1:8080/api/drills | python3 -m json.tool | head
```

The health endpoint returns `{"status":"ok"}`. The drills endpoint returns the scenario collection consumed by the browser.

## Where progress is stored

Completion, attempts, scores, misses, notes, and custom scenarios are stored in browser local storage. They remain available after stopping and restarting the Python server. They are specific to the browser profile and host/port origin.

Changing from port 8080 to 8081 creates a different browser origin and therefore a separate progress record. Use the same port when continuity matters.

## Next steps

- Learn the interface in [Product Tour](Product-Tour).
- Install a native launcher in [Installation and Desktop](Installation-and-Desktop).
- Learn the scoring model in [Grading and Scoring](Grading-and-Scoring).
- Run the container from [Containers, GHCR and CI/CD](Containers-GHCR-and-CI-CD).
