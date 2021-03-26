#!/bin/sh

# val=$(echo "$(xrandr --verbose |grep Brightness |grep -o '[0-9].*')*100" | bc)
val=$(echo $(light -G))
INT=${val%.*}

echo "%{F#BBFF0000} %{F#FFFFFF}$INT%"