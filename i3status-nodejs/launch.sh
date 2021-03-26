#!/bin/bash

killall -q polybar
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

/home/luizinho/.nvm/versions/node/v14.16.0/bin/node /home/luizinho/Development/nodejs/njsI3Bar/launch  &

echo "Polybar launched..."