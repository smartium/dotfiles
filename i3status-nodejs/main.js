const { I3Bar } = require('@i3bar/core');
const bar = new I3Bar();
const { freeMem, gpuMem, networkBlock, brightnessBlock, batteryBlock, volumeBlock, userBlock, timeBlock } = require('./blocks');

// process.stdout.write('%{F#FFFF00} Olá Mundo!')

bar.setSecondsBetweenRefreshes(0.3);
bar.enableEvents();
bar.addBlock(freeMem);
bar.addBlock(gpuMem);
bar.addBlock(networkBlock);
bar.addBlock(brightnessBlock);
bar.addBlock(batteryBlock);
bar.addBlock(volumeBlock);
bar.addBlock(timeBlock);
bar.addBlock(userBlock);

bar.on("leftClick", async function(blockName) {
    if (blockName === "volume") {
        await getCommandOutput("pactl set-sink-mute 0 toggle");
        bar.render();
    } else if (blockName === "power") {
        await getCommandOutput("xfce4-power-manager-settings");
        bar.render();
    }
});

bar.on("rightClick", async function(blockName) {
    if (blockName === "power") {
        await getCommandOutput("xfce4-power-manager-settings");
        bar.render();
    } else if (blockName === "network") {
        await getCommandOutput("nm-connection-editor");
        bar.render();
    } else if (blockName === "volume") {
        await getCommandOutput("pavucontrol");
        bar.render();
    } else if (blockName === "time") {
        // await getCommandOutput("/opt/google/chrome/google-chrome --profile-directory=Default --app-id=kjbdgfilnfhdoflbpgamdcdgpehopbep");
        await getCommandOutput("notify-send test");
        bar.render();
    }
});

bar.on("mouseWheelUp", async function(blockName) {
    if (blockName === "volume") {
        await getCommandOutput("pactl set-sink-volume 0 +1%");
        bar.render();
    } else if (blockName === "brightness") {
        // I use xorg-xbacklight from the Archlinux official packages to control the brightness of my laptop
        const brightness = await getCommandOutput("light -G")

        if (brightness) {
            // await getCommandOutput(`xbacklight -set ${parseInt(brightness) + 10}`)
            await getCommandOutput('light -A 10')
            bar.render();
        }
    }
});

bar.on("mouseWheelDown", async function(blockName) {
    if (blockName === "volume") {
        await getCommandOutput("pactl set-sink-volume 0 -1%");
        bar.render();
    } else if (blockName === "brightness") {
        const brightness = await getCommandOutput("light -G")

        if (brightness && brightness > 10) {
            await getCommandOutput('light -U 10')
            bar.render();
        }
    }
});

bar.start();