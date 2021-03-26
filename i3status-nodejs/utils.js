const { readFile } = require("fs");
const { exec } = require("child_process");
const { userInfo, networkInterfaces, freemem } = require("os");

function formatBlock(icon, command, sufix = '') {
    return `<span color="#FF0000">${icon}</span> <span color="#999999">${command}<span color="#666666" size="x-small"> ${sufix}</span></span>`
}

function addLeadingZero(input) {
    return input.toString().padStart(2, "0");
}

async function getFreeMem() {
    var mem = await (freemem) / 1024 / 1024 / 1024

    if (mem < 5) {
        getCommandOutput("notify-send WARNING 'RAM Memory is low' -u critical")
    }
    return formatBlock('', `${mem.toFixed(0)}/16`, 'GiB');
}

async function getGpuMem() {
    var smi = await getCommandOutput("nvidia-smi --query-gpu=name,temperature.gpu,memory.free,memory.total --format=csv,noheader")
    var data = smi.split(',')
    return formatBlock('', `${(parseFloat(data[2].split(' ')[1])/1024).toFixed(2)}/${(parseFloat(data[3].split(' ')[1])/1024).toFixed(0)}.00`, `GiB (${data[0]})`);
}

function getFileContent(path) {
    return new Promise(function(resolve) {
        readFile(path, function(error, data) {
            if (error) {
                resolve(false);
            } else {
                resolve(data.toString().trim());
            }
        });
    });
}

function getCommandOutput(command) {
    return new Promise(function(resolve) {
        exec(command, function(exception, output, error) {
            if (exception || error) {
                resolve(false);
            } else {
                resolve(output.toString().trim());
            }
        });
    });
}

async function getBattery() {
    const [battery, status] = await Promise.all([
        getFileContent("/sys/class/power_supply/BAT0/capacity"),
        getFileContent("/sys/class/power_supply/BAT0/status")
    ]);

    if (!battery || !status) {
        // I'm using ttf-font-awesome from the Archlinux community packages, feel free to use another icon set!
        return " ??%";
    }

    // if (status !== "Discharging" && battery <= 99) {
    //     return ` ${battery}%`;
    // }

    // if (battery <= 25) {
    //     return ` ${battery}%`;
    // }

    // if (battery <= 50) {
    //     return ` ${battery}%`;
    // }

    // if (battery <= 75) {
    //     return ` ${battery}%`;
    // }

    return formatBlock('', `${battery}`, '%');
}

async function getVolume() {
    // pactl is the Pulse Audio Control CLI, replace this with your own audio control CLI!
    const output = await getCommandOutput("pactl list sinks")

    if (!output) {
        return formatBlock('', '--');
        // return " ??%";
    }

    const volume = output.match(/\d+%/)[0].trim();
    const muted = output.match(/(?<=Mute:\s)\w+/)[0].trim();

    if (muted === "yes" || volume === "0%") {
        return formatBlock('', ' 00', '%');
    }

    return formatBlock('', volume.split('%')[0], '%');
}

function getTime() {
    const date = new Date();

    return formatBlock('', `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`);
}

async function getBrightness() {
    const brightness = await getCommandOutput("light -G");

    if (!brightness) {
        return formatBlock('', '--', '%');
    }

    return formatBlock('', parseInt(brightness), '%');
}

function getOsUsername() {
    return formatBlock('', userInfo().username);
}

function byNetworkInterfaceName(networkInterfaceName) {
    return function([currentNetworkInterfaceName]) {
        return currentNetworkInterfaceName === networkInterfaceName;
    };
}

function byFamily(networkInterfaceFamily) {
    return function(networkInterfaceOption) {
        return networkInterfaceOption.family === networkInterfaceFamily;
    }
}

function toNetworkAddress(networkInterfaceAddress, networkInterfaceOption) {
    if (!networkInterfaceAddress) {
        return networkInterfaceOption.address;
    }
}

function toNetworkInterfaceObject(networkInterfaces, [currentNetworkInterfaceName, currentNetworkInterfaceOptions]) {
    return Object.assign(networkInterfaces, {
        [currentNetworkInterfaceName]: currentNetworkInterfaceOptions.filter(byFamily("IPv4")).reduce(toNetworkAddress, "")
    });
}

function networkInterfaceIPAddress(interface) {
    const networkInterface = Object
        .entries(networkInterfaces())
        .filter(byNetworkInterfaceName(interface))
        .reduce(toNetworkInterfaceObject, {});

    if (!Object.prototype.hasOwnProperty.call(networkInterface, interface)) {
        return formatBlock('', `<span size="x-small">no network</span>`);
    }

    if (networkInterface[interface].length < 1) {
        return formatBlock('', ` <span size="x-small">connecting...</span>`);

    }

    return formatBlock('', `<span size="x-small">${networkInterface[interface]}</span>`, 'IPv4');
}

module.exports = {
    getFreeMem,
    getGpuMem,
    getCommandOutput,
    getBattery,
    getVolume,
    getTime,
    getBrightness,
    getOsUsername,
    networkInterfaceIPAddress
};