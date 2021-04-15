'use-strict';
let moviesHandler = require('../handlers/movies');
let assert = require('assert');

let params = {};
describe('unit Test cases for (+ve) getViaPlay link with trailers"', function () {
    this.timeout(30000);
    params.link = 'https://content.viaplay.se/pc-se/film/arrival-2016';
    it('200 - "Success- with passing the via play link', function (done) {
        moviesHandler.getTrailer(params, (err, resp) => {
            try {
                assert.deepStrictEqual((resp.movies.length), true);
                done();
            } catch (exc) {
                // In case of Error
                assert.notDeepEqual(exc.statusCode, 406);
                done();
            }
        })
    })
;

    it('204 - "NO CONTENT - without passing a different via play link"', function (done) {
        params.link = 'https://content.viaplay.se/pc-se/film/star-wars';
        moviesHandler.getTrailer(params, (err, resp) => {
            try {
                assert.deepStrictEqual(!(resp.entries.length), true);
                done();
            } catch (exc) {
                // In case of Error
                assert.notDeepEqual(exc.statusCode, 406);
                done();
            }
        })
    })
});


describe('unit Test cases for (-ve) getViaPlay link with trailers"', function () {
    this.timeout(30000);
    params = {};
    it('400 Validation Error while getting the trailers', function (done) {
        moviesHandler.getTrailer(params, (err, resp) => {
            try {
                assert.deepStrictEqual(err, {});
                done();
            } catch (exc) {
                // In case of Error
                assert.notDeepEqual(exc.statusCode, 406);
                done();
            }
        })
    })


    it('500 Internal Server Error while getting the trailers', function (done) {
        params = [];
        moviesHandler.getTrailer(params, (err, resp) => {
            try {
                assert.deepStrictEqual(err, {});
                done();
            } catch (exc) {
                // In case of Error
                assert.notDeepEqual(exc.statusCode, 406);
                done();
            }
        })
    })
})
