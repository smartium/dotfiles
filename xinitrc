#!/bin/bash
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

userresources=$HOME/.Xresources
#usermodmap=$HOME/.Xmodmap
#sysresources=/etc/X11/xinit/.Xresources
#sysmodmap=/etc/X11/xinit/.Xmodmap

SESSION=${1:-xfce}

# Start Xorg server at this DPI
xrandr --dpi 192

export EDITOR=/usr/bin/nvim
export QT_QPA_PLATFORMTHEME="qt5ct"
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
export GDK_SCALE=2
export GDK_DPI_SCALE=0.5
export QT_DEVICE_PIXEL_RATIO=1
dbus-update-activation-environment --systemd DBUS_SESSION_BUS_ADDRESS DISPLAY XAUTHORITY
#export PG_OF_PATH=/home/luizinho/Development/openFrameworks


# merge in defaults and keymaps

#if [ -f $sysresources ]; then
#   xrdb -merge $sysresources
#fi
#
#if [ -f $sysmodmap ]; then
#   xmodmap $sysmodmap
#fi
#
if [ -f "$userresources" ]; then
   xrdb -merge "$userresources"
fi
#
#if [ -f "$usermodmap" ]; then
#   xmodmap "$usermodmap"
#fi

# start some nice programs

#if [ -d /etc/X11/xinit/xinitrc.d ] ; then
#    for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
#        [ -x "$f" ] && . "$f"
#    done
#    unset f
#fi

get_session(){
	local dbus_args=(--sh-syntax --exit-with-session)
	case "$1" in
		awesome) dbus_args+=(awesome) ;;
		bspwm) dbus_args+=(bspwm-session) ;;
		budgie) dbus_args+=(budgie-desktop) ;;
		cinnamon) dbus_args+=(cinnamon-session) ;;
		deepin) dbus_args+=(startdde) ;;
		enlightenment) dbus_args+=(enlightenment_start) ;;
		fluxbox) dbus_args+=(startfluxbox) ;;
		gnome) dbus_args+=(gnome-session) ;;
		i3|i3wm) dbus_args+=(i3 --shmlog-size 0) ;;
		jwm) dbus_args+=(jwm) ;;
		kde) dbus_args+=(startplasma-x11) ;;
		lxde) dbus_args+=(startlxde) ;;
		lxqt) dbus_args+=(lxqt-session) ;;
		mate) dbus_args+=(mate-session) ;;
		xfce) dbus_args+=(xfce4-session) ;;
		openbox) dbus_args+=(openbox-session) ;;
		*) dbus_args+=("$1") ;;
	esac

	echo "dbus-launch ${dbus_args[*]}"
}

#exec $(get_session "$1")

#exec sway --my-next-gpu-wont-be-nvidia -V
exec i3
