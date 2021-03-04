import { useState } from "react"
import { useHistory } from "react-router-dom"

const Signup = () => {
  const [wrongsign, setWrongsign] = useState("")
  const history = useHistory()

  const sign = (e) => {
    e.preventDefault()
    const username = e.target[0].value.toLowerCase()
    const password = e.target[1].value
    const confirm = e.target[2].value
    if (password.length >= 8) {
      if (password === confirm) {
        fetch(`http://${window.location.hostname}:5000/validation_signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username })
        })
          .then(response => response.json())
          .then(data => {
            if (data.valid) {
              setWrongsign("")
              fetch(`http://${window.location.hostname}:5000/insert_user`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
              })
              history.push("/login")
            } else {
              setWrongsign("Username already taken")
            }
          })
      } else {
        setWrongsign("Those passwords didn't match")
      }
    } else {
      setWrongsign("Use 8 characters or more for password")
    }
  }

  return (
    <div className="lg-container" id = "lg-container">
      <h1>SIGN UP</h1>
      <form id="lg-form" name="lg-form" onSubmit={sign}>
        <div>
          <input type="text" id="username" placeholder="username" />
        </div>
        <div>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div>
          <input type="password" id="confirm-password" placeholder="confirm password" />
        </div>
        <div className = "logsin-button">
          <button type="submit" id="login">Sign up</button>
        </div>
        <p>{wrongsign}</p>
      </form>
    </div>
  )
}

export default Signup