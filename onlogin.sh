#!/usr/bin/sh

if [ $TERM = linux ]
then
  tput reset
  echo 
  echo 
  neofetch

  tput civis
  echo "Want enter into SMRTM graphic interface? [y/N] "
  read wantx
  tput cnorm
  case "$wantx" in
    y|Y)
    startx
    ;;
    *)
  esac
fi