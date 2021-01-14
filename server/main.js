var express = require('express')
var app = express()
var bodyParser = require('body-parser')
require('dotenv').config();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var mysql = require('mysql');
var mysql_sync = require('sync-mysql');
var request = require('sync-request');
//const bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

var user = null
var user1 = null
var search = null
var ranks = null
var wp = null
var ws = null
var avg_vote = null
var found = true
var voted = false

var port = 80

var connection = mysql.createConnection({
  host     : "recensioni-film.chitc2vxxsl5.eu-central-1.rds.amazonaws.com",
  user     : "FedericoQuartier",
  password : "3930382475",
  database : "p2",
  port     : 3306
})

var connection_sync = new mysql_sync({
  host     : "recensioni-film.chitc2vxxsl5.eu-central-1.rds.amazonaws.com",
  user     : "FedericoQuartier",
  password : "3930382475", 
  database : "p2",
  port     : 3306
})

var hashing = (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash 
}

var validation = (username) => {
  result = connection_sync.query(`SELECT username FROM users WHERE username = "${username}"`)
  if (result.length === 0) {
    return true
  }
  else {
    return false
  }
}

var popolate_tables = () => {

  connection_sync.query(`INSERT INTO users VALUES("federico", "${hashing("12345678")}")`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Spider-Man", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Spider-Man", 6)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Spider-Man", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Spider-Man", 6)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Spider-Man", "Action","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Spider-Man&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Spider-Man&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Spider-Man"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Inception", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Inception", 7)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Inception", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Inception", 6)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Inception", "Action","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Inception&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Inception&apikey=b5c264d3`).getBody().toString()).BoxOffice}", ${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Inception"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Die Hard", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Die Hard", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Die Hard", 6)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Die Hard", 9)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Die Hard", "Action", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Die Hard&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Die Hard&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Die Hard"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Shining", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Shining", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Shining", 4)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Shining", 8)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("The Shining", "Drama", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=The Shining&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=The Shining&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "The Shining"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Freaks", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Freaks", 9)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Freaks", 6)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Freaks", 10)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Freaks", "Drama","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Freaks&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Freaks&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Freaks"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Solaris", 5)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Solaris", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Solaris", 9)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Solaris", 10)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Solaris", "Drama", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Solaris&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Solaris&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Solaris"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "2001: A Space Odyssey", 5)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "2001: A Space Odyssey", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "2001: A Space Odyssey", 9)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "2001: A Space Odyssey", 10)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("2001: A Space Odyssey", "Adventure","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=2001: A Space Odyssey&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=2001: A Space Odyssey&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "2001: A Space Odyssey"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Interstellar", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Interstellar", 9)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Interstellar", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Interstellar", 3)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Interstellar", "Adventure","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Interstellar&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Interstellar&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Interstellar"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Harry Potter and the Sorcerer s Stone", 5)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Harry Potter and the Sorcerer s Stone", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Harry Potter and the Sorcerer s Stone", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Harry Potter and the Sorcerer s Stone", 4)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Harry Potter and the Sorcerer s Stone", "Adventure","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Harry Potter and the Sorcerer's Stone&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Harry Potter and the Sorcerer's Stone&apikey=b5c264d3`).getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Harry Potter and the Sorcerer's Stone"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Il Sorpasso", 6)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Il Sorpasso", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Il Sorpasso", 9)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Il Sorpasso", 2)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Il Sorpasso", "Comedy","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Il Sorpasso&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Il Sorpasso&apikey=b5c264d3`).getBody().toString()).BoxOffice}", ${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Il Sorpasso"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Sideways", 5)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Sideways", 4)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Sideways", 6)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "Sideways", 8)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("Sideways", "Comedy", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Sideways&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=Sideways&apikey=b5c264d3`).getBody().toString()).BoxOffice}", ${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Sideways"`)[0]['AVG(vote)']})`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Hangover", 5)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Hangover", 8)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Hangover", 10)`)
  connection_sync.query(`INSERT INTO votes VALUES ("federico", "The Hangover", 3)`)
  connection_sync.query(`INSERT INTO ranks VALUES ("The Hangover", "Comedy", "${JSON.parse(request('GET', `http://www.omdbapi.com/?t=The Hangover&apikey=b5c264d3`).getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request('GET', `http://www.omdbapi.com/?t=The Hangover&apikey=b5c264d3`).getBody().toString()).BoxOffice}", ${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "The Hangover"`)[0]['AVG(vote)']})`)
}



connection.connect()
connection_sync.query(`CREATE TABLE IF NOT EXISTS users (username varchar(255), password varchar(255));`)
connection_sync.query(`CREATE TABLE IF NOT EXISTS votes (username varchar(255), film varchar(255), vote int);`)
connection_sync.query(`CREATE TABLE IF NOT EXISTS ranks (film varchar(255), genre varchar(255), plot varchar(1000), boxoffice varchar(50), avarage float, PRIMARY KEY (film));`)
//popolate_tables()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules/bootstrap"))

app.get('/', (req, res) => {
  found = true 
  if (search !== null){
    if (search.Response === "False"){
      search = null
      found = false
    }
  }
  ranks = connection_sync.query(`SELECT * FROM ranks`)
  var vote = avg_vote
  if (vote === null ){vote = "N/A"}
  res.render('index', {user1, search, ranks, vote, found, voted})
})

app.get('/home', urlencodedParser , (req, res) => {
  search = null
  res.redirect("/")
})

app.post('/signup', (req, res) => {
  ws = null
  res.render("signup", {ws})
})

app.post('/login', urlencodedParser , (req, res) => {
  wp = null
  res.render("login", {wp})
})

app.post('/logout', urlencodedParser , (req, res) => {
  user = null
  res.redirect("/")
})

app.post('/log', urlencodedParser , (req, res) => {
  result = connection_sync.query(`SELECT * FROM users WHERE username = "${req.body.username}"`)
  if (result.length !== 0){
    if (!bcrypt.compareSync(req.body.password, result[0].password )){
      console.log("wrong username or password")
      wp = "Wrong username or password"
      res.render("login", {wp})
    }
    else {
      user = req.body.username.toLowerCase()
      if (user.length > 14){
        user1 = user.substring(0,14)
        user1 += "..."
      } 
      else{
        user1 = user
      }
      console.log("logged in")
      res.redirect("/")
    }
  }
  else {
    console.log("wrong username or password")
    wp = "Wrong username or password"
    res.render("login", {wp})
  }
})

app.post('/sign', urlencodedParser , (req, res) => {
  if (req.body.password.length >= 8){  
    if (req.body.password == req.body.confirm_password){
      var validity = validation(req.body.username)
      if (validity)  {
        ws = null
        wp = null
        var hash = hashing(req.body.password)
        connection.query(`INSERT INTO users VALUES("${req.body.username}", "${hash}")`, (err,result) => {
          if(err) throw err;
          console.log('signup successful');
          res.render("login", {wp})
        });
      }
      else {
        ws = "Username already taken"
        console.log("non valido")
        res.render("signup", {ws})
      }
    }
    else {
      ws = "Those passwords didn't match"
      res.render("signup", {ws})
    }
  }
  else{
    ws = "Use 8 characters or more for password"
    res.render("signup", {ws})
  }
})
  
app.post("/search", urlencodedParser, (req, res)=>{
  search = JSON.parse(request('GET', `http://www.omdbapi.com/?t=${req.body.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}&apikey=b5c264d3`).getBody().toString())
  console.log(search)
  avg_vote = connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "${search.Title}"`)[0]['AVG(vote)']
  voted = false
  res.redirect("/")
})

app.post("/vote", urlencodedParser, (req, res)=>{
  if (user !== null){
    result = connection_sync.query(`SELECT * FROM votes WHERE film = "${search.Title}" and username = "${user}"`)
    if (result.length === 0){
      connection.query(`INSERT INTO votes VALUES ("${user}","${search.Title}","${req.body.vote}")`)
      var avg = connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "${search.Title}"`)[0]["AVG(vote)"]
      connection.query(`INSERT INTO ranks VALUES ("${search.Title.replace(/'/g, "")}","${search.Genre.replace(/ .*/,'').replace(",","")}","${search.Plot.replace(/'/g, "")}","${search.BoxOffice}",${avg}) ON DUPLICATE KEY UPDATE avarage = ${avg}`)
      search = null
      voted = true
    }
    else {
      voted = true
    }
    res.redirect("/")
  }
  else {
    wp = "login first"
    res.render("login", {wp})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

