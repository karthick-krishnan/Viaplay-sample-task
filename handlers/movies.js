'use-strict';
const requestUtil = require('../utils/request-util');
const moviesCache = require('../cache/movies.js')
const { moviesConfig } = require('../config/index');


/**
 * 
 * @param {*} params
 * @param {*} callback
 * the function is used to get the trailer from a movie
 */
let getTrailer = (params, callback)=>{
try {
    let respArray = [];
    getMovieDetails(params, (err, movie)=> {
        if(err){
            callback(err);
        } else {
            if(!movie.length) {
                callback(null, []);
            }  else {
                movie.forEach((data, index)=> {
                    let imdbInformation = data.content.imdb;
                    getImdbDetails(imdbInformation, (err, resp)=>{
                        if(err){
                            callback(err);
                        } else {
                            const result = resp.results.filter(item => item.type === 'Trailer');
                            const youTubeLink = `https://www.youtube.com/watch?v=${result[0].key}`;
                            respArray.push({
                                type: data.type,
                                title: data.content.title,
                                path: data.publicPath,
                                trailer : youTubeLink
                            })
                            if(index === movie.length - 1){
                                callback(null, { movies : respArray });
                            }
                        }
                    });
                });
            }
        }
    })
} catch(ex){
    console.error(ex);
    callback(ex);
}
}


/**
 * 
 * @param {*} params
 * @param {*} callback
 * the function is used to get the movie details
 */
const getMovieDetails = (params, callback)=>{
try {
    //getting the movie from the LRU Cache and Returning it
    if(params.movie){
        callback(null, params.movie);
    } else {
        getViaplayDetails(params,(err, viaplayResponse)=>{
            if(err){
                console.log(err);
                callback(err);
            } else {
                let movie = [];
                if(viaplayResponse._embedded){
                    let viaplayBlocks = viaplayResponse._embedded['viaplay:blocks'];
                    let viaplayMovie = viaplayBlocks[0]._embedded['viaplay:product'];
                    movie.push(viaplayMovie);
                    //Saving the movie to the cache
                    moviesCache.saveMovie(params.public_path, movie);
                    callback(null, movie);
                } else {
                    callback(null, movie);
                }
            }
        })
    }
} catch(ex){
    console.error(ex);
    callback(ex);
}

}


/**
 * 
 * @param {*} params
 * @param {*} callback
 * the function is used to get the viaplay details
 */
const getViaplayDetails = (params, callback)=>{
    try {
        let reqParams = {
            url : params.link || `${moviesConfig.viaplay.url}${params.public_path}`
        }
        requestUtil.makeCall(reqParams, (err, viaplayResponse)=>{
            if(err){
                console.log(err);
                callback(err);
            } else {
                callback(null, viaplayResponse);
            }
        })
    } catch(ex){
        console.error(ex);
        callback(ex);
    }
}

/**
 * 
 * @param {*} imdbDetails
 * @param {*} callback
 * the function is used to get the imdb details
 */
const getImdbDetails =  (imdbDetails, callback) =>{
    try {
        let imdbUrl = `${moviesConfig.imdb.url}${imdbDetails.id}/videos?external_source=imdb_id&api_key=${moviesConfig.imdb.apiKey}`;
        
        let reqParams = {
            url: imdbUrl
        };
    
        requestUtil.makeCall(reqParams, (err, movieResp)=>{
            if(err){
                console.log(err);
                callback(err);
            } else {
                callback(null,movieResp);
            }
        })
    } catch(ex){
        console.error(ex);
        callback(ex);
    }
}


module.exports = {
    getTrailer : getTrailer
}