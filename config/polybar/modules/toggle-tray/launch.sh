#!/bin/bash

for bar in $(xdo id -N 'Polybar'); do
	if xprop -id $bar | grep "systray"; then
		if xprop -id $bar; then
			xdo kill $bar
			echo teste
		else
			polybar systray &
		fi
	fi
done
