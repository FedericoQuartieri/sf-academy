const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const fetch = require("node-fetch")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const app = express()

const port = 5000

app.use(express.json())
app.use(cors())

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

const popolate = () => {
  const films = ["Spider-Man", "Inception", "Die Hard", "The Shining", "Freaks", "Solaris", "2001: A Space Odyssey", "Interstellar", "Harry Potter and the Sorcerer's Stone", "Il Sorpasso", "Sideways", "The Hangover"]
  const nestedPromises = new Promise((resolve1, reject1) => {
    connection.query("CREATE TABLE IF NOT EXISTS users (username varchar(255), password varchar(255));")
    connection.query("CREATE TABLE IF NOT EXISTS votes (username varchar(255), film varchar(255), vote int);")
    connection.query("CREATE TABLE IF NOT EXISTS ranks (film varchar(255), genre varchar(255), plot varchar(1000), boxoffice varchar(50), avarage float, PRIMARY KEY (film));")
    resolve1(new Promise((resolve2, reject2) => {
      connection.query(`INSERT INTO users VALUES('federico', "${hashing("12345678")}")`)
      films.forEach(e => {
        for (var i = 0; i < 7; i++) {
          connection.query(`INSERT INTO votes VALUES ('federico', "${e}", ${Math.ceil(Math.random() * 10)})`)
        }
      })
      resolve2(new Promise((resolve3, reject3) => {
        films.forEach((e) => {
          let Plot, BoxOffice, Genre = null
          fetch(`http://www.omdbapi.com/?t=${e}&apikey=b5c264d3`)
            .then(response => response.json())
            .then(data => {
              Plot = data.Plot.replace(/'/g, "")
              BoxOffice = data.BoxOffice
              Genre = data.Genre.split(",")[0]
            })
          connection.query(`SELECT AVG(vote) FROM votes WHERE film = "${e}"`, (err, result) => {
            const avg = result[0]["AVG(vote)"].toFixed(1)
            connection.query(`INSERT INTO ranks VALUES("${e}", "${Genre}", "${Plot}", "${BoxOffice}", "${avg}")`)
          })
        })
        resolve3("resolved value")
      }))
    }))
  })
}

var hashing = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

popolate()

app.get("/rank", (req, res) => {
  connection.query("SELECT * FROM ranks", (err, result) => {
    res.json(result)
  })
})

app.post("/avg", (req, res) => {
  connection.query(`SELECT AVG(vote) FROM votes WHERE film = "${req.body.search}"`, (err, result) => {
    const avg = result[0]["AVG(vote)"]
    res.json({ avg })
  })
})

app.post("/validation_signup", (req, res) => {
  connection.query(`SELECT username FROM users WHERE username = "${req.body.username}"`, (err, result) => {
    if (result.length === 0) {
      res.json({ valid: true })
    } else {
      res.json({ valid: false })
    }
  })
})

app.post("/insert_user", (req, res) => {
  const hash = hashing(req.body.password)
  connection.query(`INSERT INTO users VALUES("${req.body.username}", "${hash}")`)
  res.json({ status: "OK " })
})

app.post("/login", (req, res) => {
  connection.query(`SELECT * FROM users WHERE username = "${req.body.username}"`, (err, result) => {
    if (result.length !== 0) {
      if (!bcrypt.compareSync(req.body.password, result[0].password)) {
        res.json({ user: null })
      } else {
        const user = req.body.username.toLowerCase()
        res.json ({ user })
      }
    } else {
      res.json({ user: null })
    }
  })
})

app.post("/validation_vote", (req, res) => {
  connection.query(`SELECT * FROM votes WHERE film = "${req.body.film}" and username = "${req.body.user}"`, (err, result) => {
    if (result.length === 0) {
      res.json({ valid: true })
    } else {
      res.json({ valid: false })
    }
  })
})

app.post("/vote", (req, res) => {
  let BoxOffice = ""
  if (req.body.search.BoxOffice === undefined) {
    BoxOffice = "N/A"
  } else {
    BoxOffice = req.body.search.BoxOffice
  }
  connection.query(`INSERT INTO votes VALUES ("${req.body.user}","${req.body.search.Title}","${req.body.vote}")`)
  connection.query(`SELECT AVG(vote) FROM votes WHERE film = "${req.body.search.Title}"`, (err, result) => {
    connection.query(`INSERT INTO ranks VALUES ("${req.body.search.Title.replace(/'/g, "").replace(/"/g, "")}","${req.body.search.Genre.replace(/ .*/, "").replace(",", "")}","${req.body.search.Plot.replace(/'/g, "").replace(/"/g, "")}","${BoxOffice}",${result[0]["AVG(vote)"].toFixed(1)}) ON DUPLICATE KEY UPDATE avarage = ${result[0]["AVG(vote)"].toFixed(1)}`)
  })
  res.json({ status: "OK " })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${port}`)
})