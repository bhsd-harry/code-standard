#!/usr/bin/env bash
DIR=${2:-.}
OUTPUT="$DIR/.oxlintrc.json"
echo '{}' > "$OUTPUT"
MIGRATE=1 migrate --js-plugins=false --details --output-file="$OUTPUT" "$DIR/${1:-eslint.config.js}"
rm "$OUTPUT.bak"
node "$(dirname "$(readlink -f "$0")")/oxlint-migrate.js" "$OUTPUT" "$3"
