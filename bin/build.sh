#!/usr/bin/env sh

normalize="node_modules/normalize.css/normalize.css"

# Find the normalize.css
if [[ -f "$normalize" ]]; then
  cat >> index.js <<EOF
import {injectGlobal} from 'emotion';

export default const normalize = injectGlobal\`
$(awk -f "bin/remComm.awk" "$normalize")\`;
EOF
else
  echo "There is no normalize.css available."
fi
