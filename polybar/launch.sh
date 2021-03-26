#!/bin/bash

# Terminate already running bar instances
killall -q polybar
#killall -q hideit

# Wait until the processes have been shut down
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

polybar -r smrtmbar &
#polybar -r systray &
#sleep 10
#$HOME/.config/polybar/modules/hideit/hideIt.sh --name '^Polybar tray window$' --region 0x1800+10+-40 &

echo "Polybar launched..."
