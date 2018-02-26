const curl = new (require( 'curl-request' ))();

const caps = {
  desiredCapabilities: {
   platformName:'android'
 }
}

// let opts = {
//   uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/device',
//   method: 'POST',
//   json: true,
// }


function requestDevice(caps) {
  curl
  .setHeaders([
      'Content-Type: application/json',
      'Authorization: Bearer '+ process.env.ACCESS_KEY,
  ])
  .setBody({
   'desiredCapabilities': caps,
  })
  .post('http://mobilefarm.minsk.epam.com:7100/automation/api/device')
  .then(({statusCode, body, headers}) => {
      console.log(statusCode, body, headers)
  })
  .catch((e) => {
      console.log(e);
  });


}
