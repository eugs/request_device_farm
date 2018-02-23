const curl = new (require( 'curl-request' ))();
const udid = 'LGK5804P596LNJ';

  // File upload
  curl
  .setHeaders([
      'Content-Type: multipart/form-data',
      'Authorization: Bearer '+ process.env.ACCESS_KEY,
  ])
  .setMultipartBody([
      {
        name: 'file',
        file: './app-release.apk',
        type: 'application/json'
      }
    ]
  )
  .post('http://mobilefarm.minsk.epam.com:7100/automation/api/storage/install/' + udid)
  .then(({statusCode, body, headers}) => {
      console.log(statusCode, body, headers)
  })
  .catch((e) => {
      console.log(e);
  });
