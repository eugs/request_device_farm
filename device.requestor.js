const request = require('request');

let requestDevice = function(caps, accessKey) {
  console.log('\n', 'attempt to find device with caps:\n', JSON.stringify(caps) +'...');

  let opts = {
    uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/device',
    method: 'POST',
    json: true,
    body: caps,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer '+ accessKey,
    },
  }

  return new Promise((resolve, reject) => {
      request.post(opts, (err, res, body)=> {
       if(err) {
         throw new Error(err)
       }
       else {
         console.log('request device statusCode:', res.statusCode);
         return (res.statusCode===200) ? resolve(body) : reject(body);
       }
    });
  });

}

let stopUsingDevice = function(udid, accessKey) {
  console.log('\nstop using:', udid +'...');

  let opts = {
    uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/device/' + udid,
    method: 'DELETE',
    json: true,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer '+ accessKey,
    },
  }

  return new Promise((resolve, reject) => {
      request.delete(opts, (err, res, body)=> {
       if(err) {
         throw new Error(err)
       }
       else {
         console.log('stop device response statusCode:', res.statusCode);
         return (res.statusCode===200) ? resolve(body) : reject(body);
       }
    });
  });

}

module.exports = { requestDevice, stopUsingDevice };
