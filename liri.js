var cmd = process.argv[2];


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (cmd) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":

    break;
}

function tweet(){
    var {twitterKeys} = require('./keys');
    var Twitter = require('twitter');
    var client = new Twitter({
      consumer_key: twitterKeys.consumer_key,
      consumer_secret: twitterKeys.consumer_secret,
      access_token_key: twitterKeys.access_token_key,
      access_token_secret: twitterKeys.access_token_secret,
    });
    var params = {screen_name: 'nothisispatrik7', count:'10'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(i=0; i<tweets.length; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        }
      }
        
    });

    }


function movie(){
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv[3];

// Create an empty variable for holding the movie name
var movieName = nodeArgs;

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings["0"].Value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
      
  }
});
}