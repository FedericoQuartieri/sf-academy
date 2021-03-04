import Notlogged from "./Notlogged"
import Logged from "./Logged"
import Rank from "./Rank"
import Search from "./Search"

import "./App.css"

import { useState } from "react"

const App = () => {
  const [search, setSearch] = useState("")
  const [avg, setAvg] = useState("")
  const [home, setHome] = useState(true)

  const submitAction = (e) => {
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?t=${e.target[0].value}&apikey=b5c264d3`)
      .then(response => response.json())
      .then(data => {
        if (data.Response !== "False") {
          setSearch(data)
          fetch(`http://${window.location.hostname}:5000/avg`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ search: e.target[0].value })
          })
            .then(response => response.json())
            .then(data => {
              let avg = data.avg
              if (avg !== null) {
                avg = avg.toFixed(1)
              } else {
                avg = "N/A"
              }
              setAvg(avg)
            })
        } else {
          setSearch("")
          alert("film not found")
        }
      })
  }

  const home_func = () => {
    setHome(true)
    setSearch("")
    window.location.reload()
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id = "navba">
        <div className="navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand" id = "home" onClick = {home_func}>Home</a>
          <form id = "searchform" onSubmit = {submitAction}>
            <input id = "searchbar" type="text" placeholder= "Search" aria-label="Search"></input>
            <button id = "searchbutton" type="submit">Search</button>
          </form>
          {sessionStorage.getItem("user") === null ?  <Notlogged /> : <Logged />}
        </div>
      </nav>
      <div>
        {search === "" ? <Rank home = { home }/> : <Search search = { search } avg = { avg }/>}
      </div>
    </div>
  )
}

export default App