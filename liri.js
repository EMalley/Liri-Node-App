require("dotenv").config();
const fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
// var arg1 = process.argv[2];
// var arg2 = process.argv[3];

// Command for finding Concerts using Bands In Town API
// name of venue
// venue location
// date of event MM/DD/YYYY
function concertThis(arg2) {
    axios.get("https://rest.bandsintown.com/artists/" + arg2 + "/events?app_id=codingbootcamp").then(function (response) {
        var data = response.data;
        if (data.length === 0) {
            console.log("There are no Upcoming Concerts")
        }
        else {
            for (var i = 0; i < 3; i++) {
                console.log('Venue for Concert: ' + data[i].venue.name +
                    '\n' + 'city: ' + data[i].venue.city +
                    '\n' + 'Date of Event: ' + moment(data[i].datetime).format('dddd, MMMM, do YYYY'))
            }
        }
    })
}
// comand For finding a Spotify song
// Artist
// Song Name
// Link of song to spotify
// Album song is from
function spotifyThisSong(arg2) {
    if (arg2 === undefined) {
        arg2 = "The Sign Ace Of Base"
    }
    spotify.search({
        type: 'track',
        query: arg2
    }).then(function (response) {
        var data = response.tracks.items[0];
        // console.log(data);
        console.log(
            "Artist: " + data.artists[0].name + '\n' +
            'Song Title: ' + data.name + '/n' +
            'Song Link: ' + data.preview_url + '\n' +
            'Album Title: ' + data.album.name)
    }).catch(function (err) {
        console.log(err);
    })
}


// command For finding a movie
// Title
// Year
// IMDB rating
// rotten Tomatoes rating
// country of production
// language of movie
// plot
// actors.
var movieThis = function (arg2) {
    axios.get("http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var data = response.data;
        console.log("=================" + '\n' +
            'Title: ' + data.Title + '\n' +
            'Year Relased: ' + data.Year + '\n' +
            'IMDB Rating: ' + data.imdbRating + '\n' +
            'Rotten Tomatoes Rating: ' + data.Ratings[1].Value + '\n'
            + 'Produced in: ' + data.Country + '\n' +
            'Language: ' + data.Language + '\n' +
            'Plot: ' + data.Plot + '\n' +
            'Actors: ' + data.Actors)
    })
};


// command For Do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error! Fix me please ", error);
        };

        dataArray = data.split(",");
        arg1 = dataArray[0];
        arg2 = dataArray[1];
        console.log(arg1, arg2)
        userCommand(arg1, arg2);

    })
}
// switch Statement for each Liri response
function userCommand(arg1, arg2) {

    switch (arg1) {
        case "concert-this":
            concertThis(arg2);
            break;

        case "spotify-this-song":
            spotifyThisSong(arg2);
            break;

        case "movie-this":
            movieThis(arg2);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
};
userCommand(process.argv[2], process.argv[3]);