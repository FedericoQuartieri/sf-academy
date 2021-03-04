import { useState, useEffect } from "react"

var Rank = (props) => {
  const [rank, setRank] = useState([])
  const [gen, setGen] = useState(true)
  const [genre, setGenre] = useState("")
  const home1 = props.home
  const [home, setHome] = useState(home1)

  useEffect(() => {
    fetch(`http://${window.location.hostname}:5000/rank`)
      .then(response => response.json())
      .then(data => {
        const ar = data.sort((a, b) => {
          return b.avarage - a.avarage
        })
        setRank(ar)
      })
  }, [])

  useEffect(() => {
    if (home) {
      setGen(true)
      setGenre("")
    }
  }, [home])

  const change = (genre) => {
    setGen(false)
    setGenre(genre)
    setHome(false)
  }

  const Gen = () => {
    if (gen) {
      const ar = rank.map((answer, i) => {
        if (i < 8) {
          return (
            <tr>
              <td>{answer.film}</td>
              <td>{answer.genre}</td>
              <td>{answer.avarage}</td>
            </tr>
          )
        }
      })
      ar.unshift(
        <tr>
          <th>Film</th>
          <th>Genre</th>
          <th>Rating</th>
        </tr>
      )
      return ar
    } else {
      const rank1 = rank.filter(element => element.genre === genre)
      const ar = rank1.map((answer, i) => {
        if (i < 3) {
          return (
            <tr>
              <td>{answer.film}</td>
              <td>{answer.plot}</td>
              <td>{answer.boxoffice}</td>
              <td>{answer.avarage}</td>
            </tr>
          )
        }
      })
      ar.unshift(
        <tr>
          <th>Film</th>
          <th>Plot</th>
          <th>BoxOffice</th>
          <th>Rating</th>
        </tr>
      )
      return ar
    }
  }

  const Notgen = (props) => {
    const { array } = props
    return array.map(e => {
      return (
        <table className = "notgen" id = {e} onClick = {() => change(e)}>
          <caption className = "notgen-caption">{e}</caption>
          <thead>
            <tr>
              <th>Film</th>
              <th>Rating</th>
            </tr>
            {rank.filter(element => element.genre === e).map((answer, i) => {
              if (i < 3) {
                return (
                  <tr>
                    <td>{answer.film.substring(0, 13)}</td>
                    <td>{answer.avarage}</td>
                  </tr>
                )
              }
            })}
          </thead>
        </table>
      )
    })
  }

  return (
    <div>
      <h1 className = "table-title">Rankings</h1>
      <table className = "gen-table" id = "gen-table">
        <thead id = "gen-thread">
          <Gen></Gen>
        </thead>
      </table>
      <div id = "notgen-container">
        <div id = "notgen-container-1">
          <Notgen array = {["Action", "Drama"]}></Notgen>
        </div>
        <div id = "notgen-container-2">
          <Notgen array = {["Adventure", "Comedy"]}></Notgen>
        </div>
      </div>
    </div>
  )
}

export default Rank
