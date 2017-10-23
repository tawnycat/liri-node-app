// Variables needed for the rest of the app

var twitterKeys = require("./keys.js");
var consumerKey = twitterKeys.twitterKeys.consumer_key;
var consumerSecret = twitterKeys.twitterKeys.consumer_secret;
var accessKey = twitterKeys.twitterKeys.access_token_key;
var accessSecret = twitterKeys.twitterKeys.access_token_secret;
var command = process.argv[2];

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


// Function for Spotify


// Function for OMDB API

// Function for "Do What It Says"