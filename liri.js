require("dotenv").config();
var keys = require("./keys.js")
var axios = require("axios")
var spotify = new Spotify(keys.spotify);
var spotifyAPI= require("node-spotify-api")
var moment = require("moment")
var arg1 = process.argv[2];
var arg2 = process.argv[3];


// Command for finding Concerts using Bands In Town API
// name of venue
// venue location
// date of event MM/DD/YYYY
if ( arg1 === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + arg2 + "/events?app_id=codingbootcamp").then(function(response){

    })
};






// comand For finding a Spotify song
// Artist
// Song Name
// Link of song to spotify
// Album song is from
if (arg1 === "spotify-this-song") {
    axios.get()
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
if (arg1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy").then(function (){
        console.log()
    });

} 
 

// command For Do-what-it-says
if (arg1=== "do-what-it-says") {
    fs.readfile("random.txt" , "utf8", function(error, data) {
        if(error){
            console.log("Error! Fix me please");
        }
        else {
            dataArray = data.split(",");
            subZero = dataArray[0];
            subOne = dataArray[1];
        }
    })
}