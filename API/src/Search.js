import { useHistory } from "react-router-dom"

var Search = (props) => {
  const { search, avg } = props
  const history = useHistory()

  const submit = (e) => {
    e.preventDefault()
    const vote = e.target.value
    if (sessionStorage.getItem("user") !== null) {
      fetch(`http://${window.location.hostname}:5000/validation_vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ film: search.Title, user: sessionStorage.getItem("user") })
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            fetch(`http://${window.location.hostname}:5000/vote`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ search, vote, user: sessionStorage.getItem("user") })
            })
              .then(response => response.json())
              .then(() => window.location.reload())
          } else {
            alert("you already voted this film")
          }
        })
    } else {
      history.push("/login?l")
    }
  }

  return (
    <div id = "big-search-container">
      <div id = "search-container">
        <h1 id = "search-title" className = "table-title">{search.Title}</h1>
        <table className = "gen-table">
          <tbody>
            {["Year", "Genre", "Runtime", "Director", "Actors", "Country", "BoxOffice"].map(e => {
              return (
                <tr>
                  <td>{e}</td>
                  <td>{search[e]}</td>
                </tr>
              )
            })}
            <tr>
              <td>Rating</td>
              <td>{avg}</td>
            </tr>
            <tr>
              <td>Plot</td>
              <td>{search.Plot}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="dropdown">
        <button className="dropbtn">VOTE</button>
        <div className="dropdown-content">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(e => {
            return <button className = "form-control mr-sm-2" value = {e} onClick={submit}>{e}</button>
          })}
        </div>
      </div>
    </div>
  )
}

export default Search