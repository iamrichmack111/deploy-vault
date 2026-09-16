#!/bin/sh
set -eu

command -v gh >/dev/null 2>&1 || { echo "GitHub CLI is required."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git is required."; exit 1; }

repo=${1:-iamrichmack111/deploy-vault}
project_dir=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
wiki_source="$project_dir/wiki"
temp_dir=$(mktemp -d "${TMPDIR:-/tmp}/deployvault-wiki.XXXXXX")
wiki_checkout="$temp_dir/wiki"
wiki_url="git@github.com:${repo}.wiki.git"

cleanup() {
  rm -rf "$temp_dir"
}
trap cleanup EXIT INT TERM

gh auth status --hostname github.com >/dev/null
gh config set git_protocol ssh --host github.com
gh repo edit "$repo" --enable-wiki

if ! git clone "$wiki_url" "$wiki_checkout"; then
  echo "The Wiki repository is not initialized yet."
  echo "Open https://github.com/$repo/wiki, create the first Home page once, then rerun this command."
  exit 1
fi

cp "$wiki_source"/*.md "$wiki_checkout"/
git -C "$wiki_checkout" add --all

if git -C "$wiki_checkout" diff --cached --quiet; then
  echo "Wiki is already current: https://github.com/$repo/wiki"
  exit 0
fi

git -C "$wiki_checkout" commit -m "docs: publish detailed DeployVault wiki"
git -C "$wiki_checkout" push origin HEAD
echo "Published: https://github.com/$repo/wiki"
