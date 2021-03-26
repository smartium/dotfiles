#!/bin/sh

killall conky

# Send the header so that i3bar knows we want to use JSON:
echo '{"version":1}'

# Begin the endless array.
echo '['

# We send an empty first array of blocks to make the loop simpler:
echo '[],'

# Now send blocks with information forever:
exec conky -q -c /home/luizinho/.config/conky/gotham/conky.conf &
exec conky -q -c /home/luizinho/.config/conky/conky.conf