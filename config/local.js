

module.exports = {
    movies : {
        imdb  : {
            url  :  process.env.IMDB_URL || `https://api.themoviedb.org/3/movie/`, 
            apiKey: process.env.API_KEY  || '9b4779a73086a7104b1a0fc5176afdb8'
        },
        viaplay : {
            url : process.env.VIAPLAY_URL || 'https://content.viaplay.se/pc-se/film/'
        }
    },
    LRU : {
        maxItems : 50000,
        max_age : 1000 * 60 * 60 
    },
    cache : {
        movies :
            {   
                label : '__movie__'
            }
    }
}