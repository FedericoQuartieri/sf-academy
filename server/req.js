
var request = require('sync-request');
filmname = "die-hard"
search = JSON.parse(request('GET', `http://www.omdbapi.com/?t=${filmname}&apikey=b5c264d3`).getBody().toString())
console.log(search)