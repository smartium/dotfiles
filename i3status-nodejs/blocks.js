const { I3Block } = require('@i3bar/core');
const { wsBarEvent, getFreeMem, getGpuMem, networkInterfaceIPAddress, getTime, getBattery, getVolume, getBrightness, getOsUsername } = require("./utils");

const wsBar = new I3Block({ full_text: wsBarEvent, name: 'wsbar', markup: 'pango' });
const freeMem = new I3Block({ full_text: getFreeMem, markup: 'pango' });
const gpuMem = new I3Block({ full_text: getGpuMem, markup: 'pango' });
const timeBlock = new I3Block({ full_text: getTime, name: 'time', markup: 'pango' });
const batteryBlock = new I3Block({ full_text: getBattery, name: 'power', markup: 'pango' });
const volumeBlock = new I3Block({ full_text: getVolume, name: "volume", markup: 'pango' });
const brightnessBlock = new I3Block({ full_text: getBrightness, name: "brightness", markup: 'pango' });
const userBlock = new I3Block({ full_text: getOsUsername, name: "username", markup: 'pango' });
const wirelessNetworkBlock = new I3Block({ full_text: () => networkInterfaceIPAddress("wlp3s0"), name: 'wirelessnetwork', markup: 'pango' });
const rndisNetworkBlock = new I3Block({ full_text: () => networkInterfaceIPAddress("enp0s20u5"), name: 'rndisnetwork', markup: 'pango' });
// List your network interfaces with Node.js in a new terminal:
// /usr/bin/node -e 'console.log(require("os").networkInterfaces())' 

module.exports = {
    wsBar,
    freeMem,
    gpuMem,
    timeBlock,
    batteryBlock,
    volumeBlock,
    brightnessBlock,
    userBlock,
    wirelessNetworkBlock,
    rndisNetworkBlock
};