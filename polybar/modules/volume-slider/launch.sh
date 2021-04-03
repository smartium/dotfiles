#!/bin/sh

VOL_LEVEL=$(amixer get Master |grep % |awk '{print $5}'|sed 's/[^0-9]//g')
IFS=' '
read -a strarr <<< "$VOL_LEVEL"
VALUE=`zenity --scale --text="Set Volume" --max-value=130 --value=${strarr[0]}`
exec amixer --quiet sset Master $VALUE%