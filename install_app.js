const request = require('request');
const fs = require('fs');
const filePath = 'app-release.apk';
const caps = {
   file : '',
}

const udid = 'ad0c1603a8c1c4db04'

try {
      caps.file = fs.readFileSync(filePath, '', printEr);
      console.log('file readed:', caps.file.length);
   } catch (e) {
       printEr(e);
   }

  function printEr(e) {
    console.log('error', e);
  }


let opts = {
  uri: 'http://mobilefarm.minsk.epam.com:7100/automation/api/storage/install/' + udid,
  method: 'POST',
  // json: true,
  form: caps,
  headers: {
    // Accept: 'application/json',
    Accept: '*/*',
    ContentType: 'multipart/form-data',
    Authorization: 'Bearer '+ process.argv[2],
  },
  port: 7100,
}



let req = request.post(opts, (err, res, body)=> {
  if(err) {
    console.log('error!', err);
  }
  console.log('response:', body);
});
