#!/bin/sh
set -eu

command -v gh >/dev/null 2>&1 || { echo "GitHub CLI is required."; exit 1; }

repo=${1:-iamrichmack111/deploy-vault}
project_dir=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
issue_dir="$project_dir/.github/roadmap-issues"

gh auth status --hostname github.com >/dev/null

ensure_label() {
  gh label create "$1" --repo "$repo" --color "$2" --description "$3" --force >/dev/null
}

ensure_label roadmap 5319e7 "Planned future improvement"
ensure_label enhancement 84b6eb "New feature or improvement"
ensure_label accessibility 0e8a16 "Accessibility and inclusive design"
ensure_label security d73a4a "Security and supply-chain work"
ensure_label testing 1d76db "Automated testing and quality"
ensure_label research c5def5 "Design research before implementation"
ensure_label priority:P1 b60205 "Highest roadmap priority"
ensure_label priority:P2 fbca04 "Medium roadmap priority"
ensure_label priority:P3 c2e0c6 "Longer-term roadmap priority"
ensure_label area:training 0e8a16 "Training content and learning workflows"
ensure_label area:platform 0052cc "Runtime, delivery, and platform engineering"
ensure_label area:ux d4c5f9 "Interface and user experience"

created=0
skipped=0

for issue_file in "$issue_dir"/*.md; do
  title=$(sed -n 's/^title: "\(.*\)"$/\1/p' "$issue_file")
  labels=$(sed -n 's/^labels: "\(.*\)"$/\1/p' "$issue_file")
  body=$(awk 'BEGIN { sections=0 } /^---$/ { sections++; next } sections >= 2 { print }' "$issue_file")

  if [ -z "$title" ] || [ -z "$labels" ] || [ -z "$body" ]; then
    echo "Invalid roadmap definition: $issue_file"
    exit 1
  fi

  if gh issue list --repo "$repo" --state all --limit 500 --json title --jq '.[].title' | grep -Fqx "$title"; then
    echo "Skipped existing issue: $title"
    skipped=$((skipped + 1))
    continue
  fi

  gh issue create --repo "$repo" --title "$title" --body "$body" --label "$labels"
  created=$((created + 1))
done

echo "Roadmap publication complete: $created created, $skipped already present."
echo "View: https://github.com/$repo/issues?q=is%3Aissue+label%3Aroadmap"

