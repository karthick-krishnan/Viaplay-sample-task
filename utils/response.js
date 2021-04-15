'use strict';

const component = "viaplay.jsonResponse";
/**
 * Response.send JSON response as output
 * @param  {object} req         : http request object
 * @param  {object} res         : http response object
 * @param  {object} data        : JSON data to be sent in response
 * @param  {integer} statusCode : of the response
 * @param  {object} err         : error
 * @return {object} status      : status 
 */
let jsonResponse = function (res, data, statusCode, err, status) {
    statusCode = statusCode || 400;
    var result;
    if (!data || data == "") {
        result = {
            status: status || "failed",
            errorMsg: err,
            statusCode: statusCode
        };
    } else {
        result = {
            status: status || "success",
            errorMsg: err,
            statusCode: statusCode,
            data: data
        };

    }

    console.log(component, null, result);
    res.status(statusCode).send(JSON.stringify(result));
};


module.exports = {
    jsonResponse: jsonResponse
};