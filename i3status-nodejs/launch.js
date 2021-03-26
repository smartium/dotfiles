"use strict";

const { exec } = require("child_process");
const fs = require('fs').promises;

function getCommandOutput(command) {
    return new Promise(function(resolve) {
        exec(command, function(exception, output, error) {
            if (exception || error) {
                resolve(false);
            } else {
                process.stdout.write(output.toString().trim());
                // resolve(output.toString().trim());
            }
        });
    });
}

var data = `[colors]
;background = #cc444444
background = #FFFFFF
background-alt = #444
foreground = #dfdfdf
foreground-alt = #A00
success = #A3BE8C
primary = #ffb52a
secondary = #e60053
alert = #bd2c40

[bar/bsimple]
width = 100%
height = 55
offset-x = 1%
;offset-y = 1%
;radius = 25.0
fixed-center = false
enable-ipc = true
dpi-x = 196
dpi-y = 196
background = #BB000000
foreground = #F0F0F0
;bottom = true

line-size = 3
line-color = #f00

border-size = 0
border-color = #FF000000

padding-left = 0
padding-right = 2 

module-margin-left = 1
module-margin-right = 2 

font-0 = monoid:pixelsize=8;1
font-1 = siji:fontformat=truetype:size=14;0
font-2=Font Awesome 5 Free Solid:size=10;3
font-3=Font Awesome 5 Free Regular:size=10;3
font-4=Font Awesome 5 Brands:size=15;3



modules-left = mleft i3
modules-right = mright

;wm-restack = bspwm
;wm-restack = i3

;override-redirect = true

;scroll-up = bspwm-desknext
;scroll-down = bspwm-deskprev

;scroll-up = i3wm-wsnext
;scroll-down = i3wm-wsprev

cursor-click = pointer
cursor-scroll = ns-resize

[module/mleft]
type = custom/text
content = "   "

;[module/mcenter]
;type = custom/text
;content = "Module Center"

[module/mright]
type = custom/script
exec = /home/luizinho/.nvm/versions/node/v14.16.0/bin/node /home/luizinho/Development/nodejs/njsI3Bar/main

[module/i3]
type = internal/i3
format = <label-state> <label-mode>
pin-workspaces = true

label-focused = %name%
;label-focused-background = #00FF00
label-focused-background = #090b10
label-focused-foreground = #00FF00
label-focused-underline= #090b10
label-focused-padding = 1

label-unfocused = unfoc
label-unfocused-padding = 1

label-visible = vis %index%
label-visible-background = #0000FF
label-visible-underline = #FFFF00
label-visible-padding = #FF00FF

label-urgent = urg %index%
label-urgent-background = #FF0000
label-urgent-padding = 2

[settings]
screenchange-reload = true
;compositing-background = xor
;compositing-background = screen
;compositing-foreground = source
;compositing-border = over
;pseudo-transparency = false

[global/wm]
margin-top = 5
margin-bottom = 5

;vim:ft=dosini
`

fs.writeFile('config', data).then(
    getCommandOutput(`
    notify-send WARNING "Polybar RESTARTED!" -u critical;
    polybar -r bsimple -c ./config &
    `)
);






// getCommandOutput("ls > config")



// process.stdout.write(`[bar/bsimple]\n
// width = 100%\n
// height = 55\n
// fixed-center = false\n
// dpi-x = 196
// dpi-y = 196
// background = #BB000000
// foreground = #FFFFFF

// modules-left = mleft i3
// modules-center = mcenter
// modules-right = mright

// [module/mleft]
// type = custom/text
// content = "Module Left"

// [module/mcenter]
// type = custom/text
// content = "Module Center"

// [module/mright]
// type = custom/text
// content = "Module Right"

// [module/i3]
// type = internal/i3
// format = <label-state> <label-mode>
// pin-workspaces = true

// label-focused = %name%
// ;label-focused-background = #00FF00
// label-focused-background = #090b10
// label-focused-foreground = #00FF00
// label-focused-underline= #090b10
// label-focused-padding = 1

// label-unfocused = unfoc
// label-unfocused-padding = 1

// label-visible = vis %index%
// label-visible-background = #0000FF
// label-visible-underline = #FFFF00
// label-visible-padding = #FF00FF

// label-urgent = urg %index%
// label-urgent-background = #FF0000
// label-urgent-padding = 2`);

// const { I3Bar } = require('@i3bar/core');
// const { getCommandOutput } = require("./utils");
// const { timeBlock, batteryBlock, volumeBlock, brightnessBlock, userBlock, networkBlock, freeMem } = require("./blocks");

// const bar = new I3Bar();

// bar.setSecondsBetweenRefreshes(10);
// bar.enableEvents();
// bar.addBlock(freeMem);
// bar.addBlock(networkBlock);
// bar.addBlock(brightnessBlock);
// bar.addBlock(batteryBlock);
// bar.addBlock(volumeBlock);
// bar.addBlock(timeBlock);
// bar.addBlock(userBlock);

// bar.on("leftClick", async function(blockName) {
//     if (blockName === "volume") {
//         await getCommandOutput("pactl set-sink-mute 0 toggle");
//         bar.render();
//     } else if (blockName === "power") {
//         await getCommandOutput("xfce4-power-manager-settings");
//         bar.render();
//     }
// });

// bar.on("rightClick", async function(blockName) {
//     if (blockName === "power") {
//         await getCommandOutput("xfce4-power-manager-settings");
//         bar.render();
//     } else if (blockName === "network") {
//         await getCommandOutput("nm-connection-editor");
//         bar.render();
//     } else if (blockName === "volume") {
//         await getCommandOutput("pavucontrol");
//         bar.render();
//     } else if (blockName === "time") {
//         // await getCommandOutput("/opt/google/chrome/google-chrome --profile-directory=Default --app-id=kjbdgfilnfhdoflbpgamdcdgpehopbep");
//         await getCommandOutput("notion-app");
//         bar.render();
//     }
// });

// bar.on("mouseWheelUp", async function(blockName) {
//     if (blockName === "volume") {
//         await getCommandOutput("pactl set-sink-volume 0 +1%");
//         bar.render();
//     } else if (blockName === "brightness") {
//         // I use xorg-xbacklight from the Archlinux official packages to control the brightness of my laptop
//         const brightness = await getCommandOutput("xbacklight -get")

//         if (brightness) {
//             await getCommandOutput(`xbacklight -set ${parseInt(brightness) + 10}`)
//             bar.render();
//         }
//     }
// });

// bar.on("mouseWheelDown", async function(blockName) {
//     if (blockName === "volume") {
//         await getCommandOutput("pactl set-sink-volume 0 -1%");
//         bar.render();
//     } else if (blockName === "brightness") {
//         const brightness = await getCommandOutput("xbacklight -get")

//         if (brightness && brightness > 10) {
//             await getCommandOutput(`xbacklight -set ${parseInt(brightness) - 10}`)
//             bar.render();
//         }
//     }
// });

// bar.start();