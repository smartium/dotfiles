#!/bin/bash

killall -q polybar
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

/home/luizinho/.nvm/versions/node/v14.16.0/bin/node /home/luizinho/.config/i3status-nodejs/bar  &