'use-strict';
const express = require('express');
const router = express.Router();
const validation  = require('../validation');
const moviesRoutes = require('./movies');

//Get the trailer with a movie link
router.get('/movies/trailer', validation.getTrailer, moviesRoutes.getCacheData, moviesRoutes.getTrailer);


//HATEOAS APIS
router.get('/movies/:publicPath/trailer', validation.getTrailerByPath, moviesRoutes.getCacheData, moviesRoutes.getTrailer);


module.exports = router;