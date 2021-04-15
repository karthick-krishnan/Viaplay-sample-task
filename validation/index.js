'use-strict';
const Validator = require('jsonschema').Validator;
const v = new Validator();
const responseCodes = require('../utils/response-codes');
const { jsonResponse } = require('../utils/response');


const trailerSchema = {
  "type": "object",
  "properties": {
    "link": {
      "type": "string"
  }, 
},
  "required": ["link"]
};



const trailerByPathSchema = {
  "type": "object",
  "properties": {
    "publicPath": {
      "type": "string"
  }, 
},
  "required": ["publicPath"]
};




const getTrailer =  (req, res, next)=> {
  try{
        let reqParams = {...req.query};
        let validation = v.validate(reqParams, trailerSchema);
        if(validation.errors.length){
          jsonResponse(res, null, responseCodes.FAILED.code, validation.errors, responseCodes.FAILED.msg);
          return;
        } else {
          next();
        }

  } catch(ex){
    console.log('exception', ex);
    jsonResponse(res, null, responseCodes.FAILED.code, validation.errors, responseCodes.FAILED.msg);
  }
}

const getTrailerByPath =  (req, res, next)=> {
  try{
        let reqParams = {...req.params};
        let validation = v.validate(reqParams, trailerByPathSchema);
        if(validation.errors.length){
          jsonResponse(res, null, responseCodes.FAILED.code, validation.errors, responseCodes.FAILED.msg);
          return;
        } else {
          next();
        }

  } catch(ex){
    console.log('exception', ex);
    jsonResponse(res, null, responseCodes.FAILED.code, validation.errors, responseCodes.FAILED.msg);
  }
}

module.exports = {
    getTrailer: getTrailer,
    getTrailerByPath : getTrailerByPath
}