const request = require('request');

const caps = {
  desiredCapabilities: {
   platformName:'android'
 }
}

let opts = {
  uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/device',
  method: 'POST',
  json: true,
  body: caps,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer '+ process.argv[2],
  },
  port: 7100,
  // rejectUnauthorized: false,
  // strictSSL: false
}


request.post(opts, (err, res, body)=> {
  if(err) {
    console.err(err);
  }
  console.log(body);
})
