#!/bin/sh
set -eu

command -v gh >/dev/null 2>&1 || { echo "Install GitHub CLI: https://cli.github.com"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Install Git first."; exit 1; }
command -v ssh >/dev/null 2>&1 || { echo "Install OpenSSH first."; exit 1; }
command -v ssh-keygen >/dev/null 2>&1 || { echo "Install OpenSSH key tools first."; exit 1; }

repo_name=${1:-deploy-vault}
owner=${GITHUB_OWNER:-iamrichmack111}
ssh_dir=${DEPLOYVAULT_SSH_DIR:-"${HOME}/.ssh"}
ssh_key=${DEPLOYVAULT_SSH_KEY:-"${ssh_dir}/id_ed25519"}
ssh_email=${GITHUB_SSH_EMAIL:-"deploy-vault@$(hostname)"}
remote_url="git@github.com:${owner}/${repo_name}.git"

gh auth status --hostname github.com >/dev/null 2>&1 || {
  echo "Authenticate first with: gh auth login --hostname github.com --git-protocol ssh"
  exit 1
}

mkdir -p "$ssh_dir"
chmod 700 "$ssh_dir"

if [ ! -f "$ssh_key" ]; then
  echo "Creating an Ed25519 SSH key at $ssh_key"
  ssh-keygen -t ed25519 -C "$ssh_email" -f "$ssh_key" -N ""
fi

if [ ! -f "${ssh_key}.pub" ]; then
  echo "Public key ${ssh_key}.pub is missing. Restore it or choose another key with DEPLOYVAULT_SSH_KEY."
  exit 1
fi

public_key=$(cat "${ssh_key}.pub")
if ! gh api user/keys --paginate --jq '.[].key' 2>/dev/null | grep -Fqx "$public_key"; then
  key_title="DeployVault $(hostname) $(date +%Y-%m-%d)"
  echo "Adding the SSH public key to GitHub as: $key_title"
  gh ssh-key add "${ssh_key}.pub" --title "$key_title"
fi

gh config set git_protocol ssh --host github.com

ssh_output=$(ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -i "$ssh_key" -T git@github.com 2>&1 || true)
if ! printf '%s' "$ssh_output" | grep -q "successfully authenticated"; then
  echo "$ssh_output"
  echo "GitHub SSH authentication failed. Check the key and try: ssh -T git@github.com"
  exit 1
fi

git init -b main 2>/dev/null || git branch -M main
git config core.sshCommand "ssh -i \"$ssh_key\" -o IdentitiesOnly=yes"
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
