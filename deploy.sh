#!/bin/bash
set -e # exit with nonzero exit code if anything fails

cd dist

git init
git config user.name "Travis CI"
git config user.email "superdweebie@gmail.com"
git add .
git commit -m "Travis auto deploy to gh-pages"

git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages

