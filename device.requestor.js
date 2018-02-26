const request = require('request');

let requestDevice = function(caps) {
  console.log('attempt to find device with caps:\n', JSON.stringify(caps) +'...');

  let opts = {
    uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/device',
    method: 'POST',
    json: true,
    body: caps,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer '+ process.env.ACCESS_KEY,
    },
  }

  return new Promise((resolve, reject) => {
      request.post(opts, (err, res, body)=> {
       if(err) {
         throw new Error(err)
       }
       else {
         console.log('response statusCode:', res.statusCode);
         return (res.statusCode===200) ? resolve(body) : reject(body);
       }
    });
  });

}

module.exports = requestDevice;
