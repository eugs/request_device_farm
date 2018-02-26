const curl = new (require( 'curl-request' ))();

function installApp(udid, appPath, deviceName) {
  console.log('attempt to install:', appPath, 'to:', deviceName, '(', udid, ')...');

  return new Promise((resolve, reject) => {
    return curl.setHeaders([
        'Content-Type: multipart/form-data',
        'Authorization: Bearer '+ process.env.ACCESS_KEY,
    ])

    .setMultipartBody([
        {
          name: 'file',
          file: appPath,
          type: 'application/json'
        }
      ]
    )

    .post('http://mobilefarm.minsk.epam.com:7100/automation/api/storage/install/' + udid)

    .then((response) => {
      console.log('response with:', response.statusCode);
      if(response.statusCode!='201') {
        console.log(response);
        throw new Error(response)
      } else {
        return resolve(response);
      }
    })

    .catch((e) => {
        console.log('Error while install ', appPath, ':', e);
        throw new Error('can\'t install ' + appPath + ' to: ' + deviceName);
    });
  })

}

module.exports = installApp;
