require('dotenv').config()
const axios = require('axios');
const spotifyKeys = require("../keys.js");
const Spotify = require("node-spotify-api");
const fs = require("fs");

module.exports = {
    bandsInTown: artistName => axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"),
    omdb: movieName => axios.get("http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy"),
    spotify: (songName, callback) => {

        var spotify = new Spotify({
            id: spotifyKeys.id,
            secret: spotifyKeys.secret
        })
        spotify.search({ type: 'track', query: songName }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            return callback(data);
        });
    }
}