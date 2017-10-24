// Variables needed for the rest of the app

var keys = require("./keys.js");
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessKey = keys.twitterKeys.access_token_key;
var accessSecret = keys.twitterKeys.access_token_secret;
var command = process.argv[2];
var userInputs = process.argv;
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var spotifyID = keys.spotifyKeys.id;
var spotifySecret = keys.spotifyKeys.secret;
var space = " ";
var spotifySong = "";
var request = require("request");
var movieTitle = "";
var fs = require("fs");

// Objects that store keys for the APIs
var twitterGet = new Twitter({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token_key: accessKey,
	access_token_secret: accessSecret
});

var spotifyGet = new Spotify({
	id: spotifyID,
	secret: spotifySecret
});

// Switch statement used to determine the code to run

function processCommand(command) {
	switch (command) {

		case "my-tweets":
		twitter();
		break;

		case "spotify-this-song":
		spotify();
		break;

		case "movie-this":
		movieThis();
		break;

		case "do-what-it-says":
		whatItSays();
		break;

		default:
		console.log("Please enter a command.");

	};
}

processCommand(command);

// Function for Twitter
function twitter () {

// Grabs info from Twitter profile
twitterGet.get('statuses/user_timeline', function(error, tweets, response) {
	if(error) throw error;

// Loops through the arrays provided by Twitter for each tweet
for (var i = 0; i < 20; i++) {

	console.log("-------------------------------------------------------------------");
	console.log(tweets[i].text);
	console.log("Created at: " + tweets[i].created_at);

}

});

}

// Function for Spotify
function spotify () {

// Checks if user entered a song title and if not, gives them Ace of Base
if (!process.argv[3]) {

	spotifyGet.search({ type: 'track', query: "the sign"}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		displaySongInfo(data.tracks.items);
	});
} else {

// Loops through user inputs to make them into a string
for (var i = 3; i < userInputs.length; i++) {

	spotifySong += userInputs[i];
	spotifySong += space;
}

spotifyGet.search({ type: 'track', query: spotifySong}, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}

	displaySongInfo(data.tracks.items);


});

}

}

// Function for OMDB API
function movieThis () {

// Checks if user entered a song title and if not, gives them Mr. Nobody
if (!process.argv[3]) {

	movieTitle = movieTitle.trim();

	var queryUrl = "http://www.omdbapi.com/?t=Mr%20Nobody&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {

			body = JSON.parse(body);

			displayMovie(body);

		}

	})
} else {

// Loops through user inputs to make them into a string
for (var i = 3; i < userInputs.length; i++) {

	movieTitle += userInputs[i];
	movieTitle += space;

}

// Takes out unnecessary spaces added by the for loop

movieTitle = movieTitle.trim();

var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body) {

	if (!error && response.statusCode === 200) {

		body = JSON.parse(body);

		displayMovie(body);

	}

})

}
}

// Function that displays all movie info

function displayMovie (body) {

	console.log("Title: " + body.Title);
	console.log("Release Year: " + body.Year);
	console.log("IMDb Rating: " + body.imdbRating);
	console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
	console.log("Country: " + body.Country);
	console.log("Language: " + body.Language);
	console.log("Plot Summary: " + body.Plot);
	console.log("Actors: " + body.Actors);

}

// Function that displays all music info

function displaySongInfo (songs) {
	for (var i = 0; i < songs.length; i++) {
		console.log("-------------------------------------------------------------------");
		console.log("Artist: " + songs[i].artists[0].name);
		console.log("Song Title: " + songs[i].name);
		console.log("Album: " + songs[i].album.name);
		console.log("Preview URL: " + songs[i].preview_url);

	}
}

// Function for "Do What It Says"
function whatItSays () {

// Reads the file

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  // Makes the file workable

  var dataArr = data.split(",");

// Takes the two items in the array and assigns them to the appropriate process.argv

process.argv[2] = dataArr[0];
process.argv[3] = dataArr[1];

// Runs the switch statement using the info from the file

processCommand(dataArr[0]);

});

}