var keys = require('./keys.js');

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitterKeys);


var getMyTweets = function() { 
  var params = {screen_name: 'JulieMa93680133'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
      for(var i=0; i=tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
      }
    }
  });
}

var getArtistNames = function(artist) {
  return artist.name;
}

var getMeSpotify = function(songName) {
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    var songs = data.tracks.items;
    for (var i=0; i=songs.length; i++) {
      console.log(i);
      console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
      console.log('song name: ' + songs[i].name);
      console.log('preview song: ' + songs[i].preview_url);
      console.log('album: ' + songs[i].album.name);
      console.log('--------------------');
    }
    //console.log(data.tracks.items[0]); 
  });
}

function movie(inputs) {
  var queryURL = 'http://www.omdbapi.com/?t=' + inputs + "&y=&plot=short&apikey=47ed448";
  request(queryURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

  var pick = function(caseData, functionData) {
    switch(caseData) {
      case 'my-tweets' :
        getMyTweets();
        break;
      case 'spotify-this-song':
        getMeSpotify(functionData);
        break;
      default:
      console.log('LIRI does not know that');
    }
  }

  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };

  runThis(process.argv[2], process.argv[3])
};