const { I3Block } = require('@i3bar/core');
const { getFreeMem, getGpuMem, networkInterfaceIPAddress, getTime, getBattery, getVolume, getBrightness, getOsUsername } = require("./utils");

const freeMem = new I3Block({ full_text: getFreeMem, markup: 'pango' });
const gpuMem = new I3Block({ full_text: getGpuMem, markup: 'pango' });
const timeBlock = new I3Block({ full_text: getTime, name: 'time', markup: 'pango' });
const batteryBlock = new I3Block({ full_text: getBattery, name: 'power', markup: 'pango' });
const volumeBlock = new I3Block({ full_text: getVolume, name: "volume", markup: 'pango' });
const brightnessBlock = new I3Block({ full_text: getBrightness, name: "brightness", markup: 'pango' });
const userBlock = new I3Block({ full_text: getOsUsername, name: "username", markup: 'pango' });
const networkBlock = new I3Block({ full_text: () => networkInterfaceIPAddress("wlp3s0"), name: 'network', markup: 'pango' });
// List your network interfaces with Node.js in a new terminal:
// /usr/bin/node -e 'console.log(require("os").networkInterfaces())' 

module.exports = {
    freeMem,
    gpuMem,
    timeBlock,
    batteryBlock,
    volumeBlock,
    brightnessBlock,
    userBlock,
    networkBlock
};