#!/bin/bash
prefix=$(cat <<EOF
(function() {
/*
 * Making sure that the generate code can be loaded as standalone script in an older browser without module bundler
 */
var exports = {};
if (typeof window !== 'undefined') {
  exports = window.exports || {};
}

EOF
)

suffix=$(cat <<EOF

})();
EOF
)


echo -e "$prefix$(cat dist/sniffr.js)$suffix" > dist/sniffr.standalone.js