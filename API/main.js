const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const mysql = require("mysql")
const mysql_sync = require("sync-mysql")
const request = require("sync-request")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const port = 80

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "recensioniFilm",
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  port: 3306
})

const connection_sync = new mysql_sync({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "recensioniFilm",
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  port: 3306
})


var hashing = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

var validation = (username) => {
  const result = connection_sync.query(`SELECT username FROM users WHERE username = "${username}"`)
  if (result.length === 0) {
    return true
  } else {
    return false
  }
}

var popolate_tables = () => {

  connection_sync.query(`INSERT INTO users VALUES('federico', "${hashing("12345678")}")`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Spider-Man', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Spider-Man', 6)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Spider-Man', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Spider-Man', 6)")
  connection_sync.query(`INSERT INTO ranks VALUES ('Spider-Man', "Action","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Spider-Man&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Spider-Man&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Spider-Man'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Inception', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Inception', 7)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Inception', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Inception', 6)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Inception", "Action","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Inception&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Inception&apikey=b5c264d3").getBody().toString()).BoxOffice}", ${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Inception'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Die Hard', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Die Hard', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Die Hard', 6)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Die Hard', 9)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Die Hard", "Action", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Die Hard&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Die Hard&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Die Hard'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Shining', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Shining', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Shining', 4)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Shining', 8)")
  connection_sync.query(`INSERT INTO ranks VALUES ("The Shining", "Drama", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=The Shining&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=The Shining&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'The Shining'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Freaks', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Freaks', 9)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Freaks', 6)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Freaks', 10)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Freaks", "Drama","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Freaks&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Freaks&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Freaks'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Solaris', 5)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Solaris', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Solaris', 9)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Solaris', 10)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Solaris", "Drama", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Solaris&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Solaris&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Solaris'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', '2001: A Space Odyssey', 5)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', '2001: A Space Odyssey', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', '2001: A Space Odyssey', 9)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', '2001: A Space Odyssey', 10)")
  connection_sync.query(`INSERT INTO ranks VALUES ("2001: A Space Odyssey", "Adventure","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=2001: A Space Odyssey&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=2001: A Space Odyssey&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = '2001: A Space Odyssey'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Interstellar', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Interstellar', 9)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Interstellar', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Interstellar', 3)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Interstellar", "Adventure","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Interstellar&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Interstellar&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Interstellar'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Harry Potter and the Sorcerer s Stone', 5)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Harry Potter and the Sorcerer s Stone', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Harry Potter and the Sorcerer s Stone', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Harry Potter and the Sorcerer s Stone', 4)")
  // eslint-disable-next-line quotes
  connection_sync.query(`INSERT INTO ranks VALUES ("Harry Potter and the Sorcerer s Stone", "Adventure","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Harry Potter and the Sorcerer's Stone&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Harry Potter and the Sorcerer's Stone&apikey=b5c264d3").getBody().toString()).BoxOffice}",${connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "Harry Potter and the Sorcerer's Stone"`)[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Il Sorpasso', 6)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Il Sorpasso', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Il Sorpasso', 9)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Il Sorpasso', 2)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Il Sorpasso", "Comedy","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Il Sorpasso&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Il Sorpasso&apikey=b5c264d3").getBody().toString()).BoxOffice}", ${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Il Sorpasso'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Sideways', 5)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Sideways', 4)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Sideways', 6)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'Sideways', 8)")
  connection_sync.query(`INSERT INTO ranks VALUES ("Sideways", "Comedy", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Sideways&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=Sideways&apikey=b5c264d3").getBody().toString()).BoxOffice}", ${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'Sideways'")[0]["AVG(vote)"]})`)
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Hangover', 5)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Hangover', 8)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Hangover', 10)")
  connection_sync.query("INSERT INTO votes VALUES ('federico', 'The Hangover', 3)")
  connection_sync.query(`INSERT INTO ranks VALUES ("The Hangover", "Comedy", "${JSON.parse(request("GET", "http://www.omdbapi.com/?t=The Hangover&apikey=b5c264d3").getBody().toString()).Plot.replace(/'/g, "")}","${JSON.parse(request("GET", "http://www.omdbapi.com/?t=The Hangover&apikey=b5c264d3").getBody().toString()).BoxOffice}", ${connection_sync.query("SELECT AVG(vote) FROM votes WHERE film = 'The Hangover'")[0]["AVG(vote)"]})`)
}


connection.connect()
connection_sync.query("CREATE TABLE IF NOT EXISTS users (username varchar(255), password varchar(255));")
connection_sync.query("CREATE TABLE IF NOT EXISTS votes (username varchar(255), film varchar(255), vote int);")
connection_sync.query("CREATE TABLE IF NOT EXISTS ranks (film varchar(255), genre varchar(255), plot varchar(1000), boxoffice varchar(50), avarage float, PRIMARY KEY (film));")
// popolate_tables()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules/bootstrap"))
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false, cookie: { maxAge: 60000 } }))

app.get("/", (req, res) => {
  let found = true
  let search = req.session.search
  if (search === undefined) {
    search = null
  }
  if (search !== null) {
    if (search.Response === "False") {
      search = null
      found = false
    }
  }
  const ranks = connection_sync.query("SELECT * FROM ranks")
  let vote = req.session.avg_vote
  if (vote === null) {
    vote = "N/A"
  }
  let user1 = req.session.user1
  if (user1 === undefined) {
    user1 = null
  }
  const voted = req.session.voted
  res.render("index", { user1, search, ranks, vote, found, voted })
})

app.get("/home", urlencodedParser, (req, res) => {
  req.session.search = null
  res.redirect("/")
})

app.post("/signup", (req, res) => {
  const ws = null
  res.render("signup", { ws })
})

app.post("/login", urlencodedParser, (req, res) => {
  const wp = null
  res.render("login", { wp })
})

app.post("/logout", urlencodedParser, (req, res) => {
  req.session.user1 = null
  req.session.user = null
  res.redirect("/")
})

app.post("/log", urlencodedParser, (req, res) => {
  const result = connection_sync.query(`SELECT * FROM users WHERE username = "${req.body.username}"`)
  if (result.length !== 0) {
    if (!bcrypt.compareSync(req.body.password, result[0].password)) {
      var wp = "Wrong username or password"
      res.render("login", { wp })
    } else {
      const user = req.body.username.toLowerCase()
      if (user.length > 14) {
        var user1 = user.substring(0, 14)
        user1 += "..."
      } else {
        user1 = user
      }
      req.session.user = user
      req.session.user1 = user1
      res.redirect("/")
    }
  } else {
    wp = "Wrong username or password"
    res.render("login", { wp })
  }
})

app.post("/sign", urlencodedParser, (req, res) => {
  if (req.body.password.length >= 8) {
    if (req.body.password === req.body.confirm_password) {
      const validity = validation(req.body.username)
      if (validity)  {
        var ws = null
        const wp = null
        const hash = hashing(req.body.password)
        connection.query(`INSERT INTO users VALUES("${req.body.username}", "${hash}")`, () => {
          res.render("login", { wp })
        })
      } else {
        ws = "Username already taken"
        res.render("signup", { ws })
      }
    } else {
      ws = "Those passwords didn't match"
      res.render("signup", { ws })
    }
  } else {
    ws = "Use 8 characters or more for password"
    res.render("signup", { ws })
  }
})

app.post("/search", urlencodedParser, (req, res) => {
  const search = JSON.parse(request("GET", `http://www.omdbapi.com/?t=${req.body.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}&apikey=b5c264d3`).getBody().toString())
  req.session.avg_vote = connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "${search.Title}"`)[0]["AVG(vote)"]
  req.session.voted = false
  req.session.search = search
  res.redirect("/")
})

app.post("/vote", urlencodedParser, (req, res) => {
  let voted = true
  if (req.session.user !== undefined) {
    const result = connection_sync.query(`SELECT * FROM votes WHERE film = "${req.session.search.Title}" and username = "${req.session.user}"`)
    if (result.length === 0) {
      connection.query(`INSERT INTO votes VALUES ("${req.session.user}","${req.session.search.Title}","${req.body.vote}")`)
      const avg = connection_sync.query(`SELECT AVG(vote) FROM votes WHERE film = "${req.session.search.Title}"`)[0]["AVG(vote)"]
      connection.query(`INSERT INTO ranks VALUES ("${req.session.search.Title.replace(/'/g, "")}","${req.session.search.Genre.replace(/ .*/, "").replace(",", "")}","${req.session.search.Plot.replace(/'/g, "")}","${req.session.search.BoxOffice}",${avg}) ON DUPLICATE KEY UPDATE avarage = ${avg}`)
      req.session.search = null
      voted = true
    } else {
      voted = true
    }
    req.session.voted = voted
    res.redirect("/")
  } else {
    const wp = "login first"
    res.render("login", { wp })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`)
})

