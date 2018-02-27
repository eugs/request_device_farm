const request = require('request');
const fs = require('fs');

function installApp(appPath, udid, accessKey, deviceName) {
  console.log('attempt to install:', appPath, 'to:', deviceName, '(', udid, ')...');

  if(!fs.existsSync(__dirname + appPath)) {
    throw new Error('\n!not exists: ' + __dirname + appPath);
  }

  const data = {
    file: fs.createReadStream(__dirname + appPath),
  };
  console.log('read stream created for', appPath + '...');

  let opts = {
    uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/storage/install/' + udid,
    method: 'POST',
    // json: true,
    formData: data,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer '+ accessKey,
    },
  }

   return new Promise((resolve, reject) => {
     request.post(opts, (err, response, body)=> {
        if(err) {
          throw new Error(err)
        } else {
          console.log('response statusCode:', response.statusCode);
          let result = {
            'code' : response.statusCode, 'message' : response.statusMessage
          }
          return (response.statusCode===201) ? resolve(result) : reject(result);
        }
     });
   });
 }

module.exports = installApp;
