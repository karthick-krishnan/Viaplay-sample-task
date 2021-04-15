"use strict";
const moviesHandler = require('../handlers/movies')
const { jsonResponse } = require('../utils/response');
const responseCodes = require('../utils/response-codes');
const { INTERNAL_SERVER_ERROR, SUCCESS, NO_CONTENT } = responseCodes;
const movieCache = require('../cache/movies');


/**
 * 
 * @param {*} req
 * @param {*} res
 * the function is used to get the trailer from a movie
 */
const getTrailer = (req, res)=>{
    try {
        let params = {
            ...req.query,
            ...req.body,
            ...req.params
        }
        
        moviesHandler.getTrailer(params, (err, response)=> {
            if (err) {
                jsonResponse(res, response, INTERNAL_SERVER_ERROR.code, err, INTERNAL_SERVER_ERROR.msg);
            } else if((response.movie) && !(response.movie.length)){
                jsonResponse(res, response, NO_CONTENT.code, null, NO_CONTENT.msg);
            } else {
                jsonResponse(res, response, SUCCESS.code, null, SUCCESS.msg);
            }
    
        })
    } catch(ex){
        console.log(ex);
        jsonResponse(res, response, INTERNAL_SERVER_ERROR.code, ex, INTERNAL_SERVER_ERROR.msg);
    }
}


/**
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * the function is used to get the trailer from a movie
 */
const getCacheData = (req, res, next)=>{
    try {
        let publicPath;
        if(req.params.publicPath){
            publicPath = _getMoviePath(req.params.publicPath);
        } else {
            publicPath = _getMoviePath(req.query.link);
        }
        let cacheData = movieCache.getMovie(publicPath);
        req.body.movie = cacheData;
        req.body.public_path = publicPath;
        next();
} catch(ex){
    console.log(ex);
    jsonResponse(res, res, INTERNAL_SERVER_ERROR.code, ex, INTERNAL_SERVER_ERROR.msg);
}
}


const _getMoviePath = (link)=>{
   return link.split('/').pop();
}


module.exports = {
    getTrailer: getTrailer,
    getCacheData: getCacheData
}