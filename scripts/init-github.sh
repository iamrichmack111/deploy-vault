#!/bin/sh
set -eu

command -v gh >/dev/null 2>&1 || { echo "Install GitHub CLI: https://cli.github.com"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Install Git first."; exit 1; }

repo_name=${1:-deploy-vault}
owner=${GITHUB_OWNER:-iamrichmack111}
remote_url="git@github.com:${owner}/${repo_name}.git"

gh auth status --hostname github.com >/dev/null 2>&1 || {
  echo "No active GitHub CLI session was found. Check it with: gh auth status"
  exit 1
}

gh config set git_protocol ssh --host github.com

git init -b main 2>/dev/null || git branch -M main
git add .
if ! git rev-parse HEAD >/dev/null 2>&1; then
  git commit -m "feat: launch DeployVault Kubernetes trainer"
fi

if gh repo view "$owner/$repo_name" >/dev/null 2>&1; then
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$remote_url"
  else
    git remote add origin "$remote_url"
  fi
else
  gh repo create "$owner/$repo_name" --public --source=. \
    --description "Zero-install Kubernetes incident simulator, interview trainer, and readiness dashboard"
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$remote_url"
  else
    git remote add origin "$remote_url"
  fi
fi

git push -u origin main
gh repo edit "$owner/$repo_name" \
  --add-topic kubernetes --add-topic devops --add-topic sre --add-topic kubectl \
  --add-topic incident-response --add-topic platform-engineering --add-topic interview-prep
echo "GitHub repository initialized over SSH: $remote_url"
echo "GHCR publishes automatically from the main workflow."
