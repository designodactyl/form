#!/usr/bin/env sh

server="128.199.88.153"
user="root"
target="/var/www/design.byform.co/public_html/craft"

rsync -arvuz . "$user@$server:$target" --exclude="/gulpfile.js" --exclude="/package.json" --exclude="/scripts" --exclude=".*" --exclude="*.log" --exclude="/node_modules" --exclude="/src"  --exclude="yarn-error.log" --exclude="yarn.lock" --exclude="/server"
