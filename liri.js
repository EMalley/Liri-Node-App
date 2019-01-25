require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var arg1 = process.argv[2];
var arg2 = process.argv[3];

userCommand();
// switch Statement for each Liri response
function userCommand() {
    switch (arg1) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
};

// Command for finding Concerts using Bands In Town API
// name of venue
// venue location
// date of event MM/DD/YYYY
function concertThis() {
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
 
    // comand For finding a Spotify song
    // Artist
    // Song Name
    // Link of song to spotify
    // Album song is from
    function spotifyThisSong() {
        if (arg2 === {}) { arg2 === 'The Sign Ace of Base' };
        spotify.search({
            type: 'track', query: arg2
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        })
    };


    // command For finding a movie
    // Title
    // Year
    // IMDB rating
    // rotten Tomatoes rating
    // country of production
    // language of movie
    // plot
    // actors.
    function movieThis() {
        axios.get("http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy").then(function (response) {
            var data = response.data;
            console.log("=================" + '\n' +
                'Title: ' + data.Title + '\n' + 'Year Relased: ' + data.Year + '\n' + 'IMDB Rating: ' + data.imdbRating + '\n' + 'Rotten Tomatoes Rating: ' + data.Ratings[1].Value + '\n' + 'Produced in: ' + data.Country + '\n' + 'Language: ' + data.Language + '\n' + 'Plot: ' + data.Plot + '\n' + 'Actors: ' + data.Actors)
        })
    };


    // command For Do-what-it-says
    if (arg1 === "do-what-it-says") {
        fs.readfile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log("Error! Fix me please");
            }
            else {
                dataArray = data.split(",");
                subZero = dataArray[0];
                subOne = dataArray[1];
            }
        })
    }
}