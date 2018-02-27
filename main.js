const requestDevice = require('./device.requestor');
const installApp = require('./curl.install');
const minimist = require('minimist');

//parse cmd params
let params =  minimist(process.argv.slice(2));
const KEY = (params.key) ? params.key : process.env.ACCESS_KEY;

capabilities = {
  desiredCapabilities : params
}


  requestDevice(capabilities, KEY)

  .then((response) => {
    console.log('response with:', response);
    return response;
  })
  .then((response) => {
    let device = response.desiredCapabilities;
    console.log('find device with id:', device.udid);
    return installApp(params.app, device.udid, KEY, device.deviceName);
  })
  .then((response) => {
    console.log('result:', response.headers.result);
    console.log('return caps:', capabilities);
    return capabilities;
  })
  .catch((error) => {
    console.log('!ERROR:', error);
    return 1;
  })
