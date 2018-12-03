require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var operation = input[2];
var searchItem = "";

if (operation === "concert-this") {
    searchItem = input[3]
    var concertUrl = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";
    axios.get(concertUrl).then(
        function(response) {
            console.log("-----------------")
            console.log("Venue: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("Date: " + response.data[0].datetime);
            console.log("-----------------")
        }
      );  
} else if (operation === "spotify-this-song") {
  song();
} else if (operation === "movie-this") {
    for (var i = 3;  i < input.length; i++){
        searchItem = searchItem + " " + input[i];
    };
    searchItem = searchItem.replace(" ", "%20");
    var movieUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";
    axios.get(movieUrl).then(function (response) {
        console.log("-----------------")
        console.log("Title: " + response.data.Title);
        console.log("Release Date: " + response.data.Year);
        console.log("IMBD Rating: " + response.data.imdbRating);
        console.log("Overall Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Pilor: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("-----------------")
    });
} else if (operation === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
        console.log(err);
        }
        data = data.split('"');
        var dataArr = data;
        operation = dataArr[0].split(',')[0];
        searchItem = dataArr[1];
        song();
    });
} else {
    console.log("Please enter a valid operation")
}


function song(){
    for (var i = 3;  i < input.length; i++){
        searchItem = searchItem + " " + input[i];
    };
    searchItem = searchItem.replace(" ", "%20");
    spotify.search({ type: 'track', query: searchItem }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("-----------------")
        console.log("Title: " + searchItem);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log( "URL: " + data.tracks.items[0].preview_url);
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log("-----------------")
});
};