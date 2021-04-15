const { cacheConfig } = require('../config/index');

/**
 * 
 * @param {*} movieName 
 * the function is used to get the movie from the cache
 */
module.exports.getMovie = (movieName)=>{
    let key = `${cacheConfig.movies.label}${movieName}`;
    let movieData = cache.get(key);
    return movieData;
}

/**
 * 
 * @param {*} movieName 
 * the function is used to save the movie to the cache
 */
module.exports.saveMovie = (movieName, data)=>{
    let key = `${cacheConfig.movies.label}${movieName}`
    cache.set(key ,data);
    return;
}