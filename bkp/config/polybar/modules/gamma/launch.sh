#!/bin/sh

val=$(echo "$(xrandr --verbose |grep Brightness |grep -o '[0-9].*')*100" | bc)
INT=${val%.*}

echo "%{F#BBFF0000} %{F#FFFFFF}$INT"