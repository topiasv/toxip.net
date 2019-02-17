#!/bin/bash

# skip if build is triggered by pull request
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

# enable error reporting to the console
set -e

# cleanup "_site"
rm -rf _site
mkdir _site

# clone remote repo to "_site"
git clone https://${GH_TOKEN}@github.com/topiasv/toxip.net.git --branch gh-pages _site

# build with Jekyll into "_site"
bundle exec jekyll build

# push
if [ -f CNAME ]; then
  cp CNAME _site/
fi
cd _site
git config user.email "toxip@disroot.org"
git config user.name "Topias Vainio"
git add --all
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --force origin gh-pages