# GitHub SSH setup

DeployVault uses SSH for GitHub Git operations. HTTPS credentials are not stored
in the repository or used by the initializer.

## One-command repository setup

Authenticate the GitHub CLI and run the initializer from the project root:

```bash
gh auth login --hostname github.com --git-protocol ssh
./scripts/init-github.sh
```

The initializer:

1. Reuses `$HOME/.ssh/id_ed25519`, or creates it if it does not exist.
2. Adds the public key to the authenticated GitHub account when necessary.
3. Tests `ssh -T git@github.com` before creating or pushing the repository.
4. Creates or connects `iamrichmack111/deploy-vault`.
5. Sets `origin` to `git@github.com:iamrichmack111/deploy-vault.git`.
6. Pins the selected key in the repository's local Git configuration.
7. Pushes `main` and applies the project topics.

## Verify the connection

```bash
ssh -T git@github.com
git remote -v
```

GitHub intentionally ends the SSH test without opening a shell. A successful
test says that you authenticated successfully.

## Use another key or account

```bash
GITHUB_OWNER=your-account \
DEPLOYVAULT_SSH_KEY="$HOME/.ssh/your_github_key" \
GITHUB_SSH_EMAIL="you@example.com" \
./scripts/init-github.sh deploy-vault
```

If the key is not one of OpenSSH's default key names, add this host entry to
`$HOME/.ssh/config`:

```sshconfig
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/your_github_key
  IdentitiesOnly yes
```
