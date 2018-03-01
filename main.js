const deviceRequestor = require('./device.requestor');
const installApp = require('./install.app');
const minimist = require('minimist');
const fs = require('fs');

const filePath = './device.json';

let device;

//parse cmd params
let params =  minimist(process.argv.slice(2));
const KEY = (params.key) ? params.key : process.env.ACCESS_KEY;

capabilities = {
  desiredCapabilities : params
}

  deviceRequestor.requestDevice(capabilities, KEY)
    .then((response) => {
      console.log('response with:', response, '\n');
      return response;
    })
    .then((response) => {
      device = response.desiredCapabilities;
      console.log('find device with id:', device.udid);
      return installApp(params.app, device.udid, KEY, device.deviceName);
    })
    .then((result) => {
        console.log('result:', result, '\n');
        console.log('return caps:', capabilities, '\n');

        // store device in JSON for further use
        fs.writeFileSync(filePath, JSON.stringify(device, null, 2));
        return capabilities;
    })
    .catch((error) => {
      console.log('ERROR:', error);
      return deviceRequestor.stopUsingDevice(device.udid, KEY);
      // return 1;
  })
