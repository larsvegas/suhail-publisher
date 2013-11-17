#!/bin/bash

set -e

JSHINT="./node_modules/jshint/bin/jshint"
echo $JSHINT
if [ ! -f "$JSHINT" ]; then
    JSHINT="$(command -v jshint || true)"
fi

if [ ! -x "$JSHINT" ]; then
    echo "[$0] Command 'jshint' not found"
    echo "[$0] >> npm install -g jshint"
    exit 1
fi

for file in $(git diff --cached --name-only); do
    RESULT=`git grep --name-only --full-name 'use strict' ${file} &> /dev/null; echo $?`
    if [ "$RESULT" == "0" ]; then
        echo "[$0] Jshint '$file' ..."
        $JSHINT "$file"
    fi
done
