#!/bin/sh
set -eu
command -v d2 >/dev/null 2>&1 || { echo "Install D2 from https://d2lang.com/tour/install"; exit 1; }
d2 --theme 200 docs/d2/architecture.d2 media/architecture.svg
d2 --theme 200 docs/d2/training-process.d2 media/training-process.svg
d2 --theme 200 docs/d2/delivery-pipeline.d2 media/delivery-pipeline.svg

