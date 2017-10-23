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
 
console.log(data); 
});

}

}

// Function for OMDB API
function movieThis () {



}

// Function for "Do What It Says"
function whatItSays () {



}