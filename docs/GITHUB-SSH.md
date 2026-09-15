# GitHub SSH setup

DeployVault uses SSH for GitHub Git operations. HTTPS credentials are not stored
in the repository or used by the initializer.

## One-command repository setup

When `gh auth status` already reports `Git operations protocol: ssh`, run the
initializer directly from the project root:

```bash
gh auth status
./scripts/init-github.sh
```

The initializer:

1. Uses the currently authenticated GitHub CLI account.
2. Keeps GitHub CLI configured for SSH Git operations.
3. Creates or connects `iamrichmack111/deploy-vault`.
4. Sets `origin` to `git@github.com:iamrichmack111/deploy-vault.git`.
5. Pushes `main` and applies the project topics.

It does not log in again, generate keys, upload keys, or override the SSH key
already selected by your system.

## Verify the connection

```bash
ssh -T git@github.com
git remote -v
```

GitHub intentionally ends the SSH test without opening a shell. A successful
test says that you authenticated successfully.

## Use another account

```bash
GITHUB_OWNER=your-account \
./scripts/init-github.sh deploy-vault
```
