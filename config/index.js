
"use strict";
const env = process.env.NODE_ENV || 'local.js';
const config = require(`./${env}`);

module.exports = {
    moviesConfig : config.movies,
    LRUConfig : config.LRU,
    cacheConfig : config.cache
}