const request = require('request');



module.exports.makeCall = (params, callback)=>{
try{

    request({
        url: params.url,
        agentOptions: {
          rejectUnauthorized: false
        }
      }, function (err, resp, body) {
        if (err) {
            console.log('component', null, 'NODATA');
            callback(err);
        } else {
            callback(null, JSON.parse(body));
        }
      });
} catch(ex){
  callback(ex);
}

}
