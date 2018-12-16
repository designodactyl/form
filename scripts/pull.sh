#!/usr/bin/env sh
rsync -r -p -t -u -z --exclude=".*" -P -h -i --delete HOST:/var/www/SITE/content ./
