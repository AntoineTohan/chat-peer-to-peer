const find = require("local-devices");
const isPortReachable = require("is-port-reachable");
const ip = require("ip");

async function findAllLocalMachine() {
  const allDevices = await find().then(devices => {
    return devices;
  });

  const myIp = ip.address();
  const allDevicesExtern = allDevices.filter(devices => devices.ip !== myIp);

  const reachables = await Promise.all(
    allDevicesExtern.map(async (devices, idx) => {
      const isOpen = await isPortReachable(3001, { host: devices.ip });
      devices.name = idx;
      devices.isOpen = isOpen;
      return devices;
    })
  );
  return reachables;
}

module.exports.findAllLocalMachine = findAllLocalMachine;
