#!/bin/sh

cat ".git/COMMIT_EDITMSG" | grep -E '^(build|ci|docs|feat|fix|perf|refactor|style|test)(\([-/a-z]+\))?!?: [A-Z\]|Merge branch .*' 
if [ "$?" -ne 0 ]; then
  echo "Commit message is not in correct format"
  cat ".git/COMMIT_EDITMSG"
  exit 1
fi
