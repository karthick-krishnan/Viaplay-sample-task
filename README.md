# Viaplay Task

## Table of Contents

1. [Purpose](#purpose)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
4. [Application Structure](#application-structure)
5. [Server Application Structure](#server-application-structure)
6. [SERVICE TO GET THE TRAILERS FOR EACH MOVIE BY MOVIE LINK](#service-get-trailer-movie-apis)
7. [SERVICE TO GET THE TRAILERS FOR EACH MOVIE BY PUBLIC PATH OF A MOVIE](#service-get-trailer-movie-apis)


## Purpose

To get the trailers of each movie urls from the given apis

## Requirements

- node
- npm

## Getting Started

To get Started please follow the below Requirements
[requirements](#requirements), you can follow these steps to get the project up and running:

```window
$ git clone "https://github.com/karthick-krishnan/Atlavik-task.git"
$ npm install                   # Installs project dependencies
$ npm start                     # Compiles and launches server
$ npm test                      # Run server test cases
```
## Server Application Structure
```
├── cache                    # module which contains the cache details
├── config                   # module which contains the config details
├── handlers                 # Main module which contains the business logics of the apis
├── routes                   # module which contains the application routing details
├── test                     # Main module which contains all test cases
├── utils                    # Application level utility methods/logics
├── validation               # Validation of the request
```


## SERVICE TO GET THE TRAILERS FOR EACH MOVIE BY MOVIE LINK

- Method: `GET`

- **::** <http://localhost:3000/viaplay/movies/trailer?link=https://content.viaplay.se/pc-se/film/arrival-2016>

- URL: `viaplay/movie/trailer`


| Parameter  | Description             | Param Type| Required  |
|------------|-------------------------|-----------|-----------|
| link       | link                    | Query     |  YES      |

Response Json body for get all Entry APIS (Example):

```json
{
    "status": "SUCCESS",
    "errorMsg": null,
    "statusCode": 200,
    "data": {
        "movies": [
            {
                "type": "movie",
                "title": "Arrival",
                "path": "arrival-2016",
                "trailer": "https://www.youtube.com/watch?v=7W1m5ER3I1Y"
            }
        ]
    }
}

```
Response Json body for error scenario (Example):

```json
{
    "statusCode": 500,
    "responseCode": "FAILED",
    "errorMsg": {
        "message": "INTERNAL SERVER ERROR",
    },
    "data": ""
}
```

## HATEAOS API EXAMPLE IMPLIMENTATION

## SERVICE TO GET THE TRAILERS FOR EACH MOVIE BY PUBLIC PATH OF A MOVIE

- Method: `GET`

- **::** <http://localhost:3000/viaplay/movies/above-suspicion-2019/trailer>

- URL: `/viaplay/movies/:publicPath/trailer`

| Parameter  | Description             | Param Type| Required  |
|------------|-------------------------|-----------|-----------|
| publicPath | publicPath              | Params    |  Yes      |

- Response Json (Example):

  ```json
  {
    "status": "SUCCESS",
    "errorMsg": null,
    "statusCode": 200,
    "data": {
        "movies": [
            {
                "type": "movie",
                "title": "Above Suspicion",
                "path": "above-suspicion-2019",
                "trailer": "https://www.youtube.com/watch?v=6JNIyuZJjdQ"
            }
        ]
    }
}

  ```

## Get requests API Exceptions

Error code |                         Error Message
---------- | :-----------------------------------------------------------:
400        |                    Invalid Input
401        |                    Unauthorized
403        |                    User is not authorized 
500        |                    FAILED



# Tables
No tables are required