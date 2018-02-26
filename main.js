const requestDevice = require('./device.requestor');
const installApp = require('./curl.install');

const appPath = './app-release.apk';
// const appPath = './benefits.ipa';
const capabilities = {
  desiredCapabilities: {
    platformName:'android',
  }
}

  requestDevice(capabilities)

  .then((response) => {
    console.log('response with:', response);
    return response;
  })
  .then((response) => {
    let device = response.desiredCapabilities;
    console.log('find device with id:', device.udid);
    return installApp(device.udid, appPath, device.deviceName);
  })
  .then((response) => {
    console.log('result:', response.headers.result);
    return 0;
  })
  .catch((error) => {
    console.log('!ERROR:', error);
    return 1;
  })
