#!/usr/bin/env sh

git submodule foreach --recursive git checkout master
git submodule foreach --recursive git pull