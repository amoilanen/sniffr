#!/bin/bash
preamble=$(cat <<EOF
/*
 * Making sure that the generate code can be loaded as standalone script in an older browser without module bundler
 */
if (typeof window !== 'undefined') {
  window.exports = window.exports || {}
}

EOF
)


echo -e "$preamble$(cat dist/sniffr.js)" > dist/sniffr.js