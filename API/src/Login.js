import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const Login = () => {
  const [wronglog, setWronglog] = useState("")
  const history = useHistory()


  useEffect(() => {
    if (window.location.search.substring(1) === "l") {
      setWronglog("Login first")
    }
  }, [window.location.search])


  const sign = () => {
    history.push("/signup")
  }

  const log = (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    fetch(`http://${window.location.hostname}:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.user !== null) {
          sessionStorage.setItem("user", data.user)
          setWronglog("")
          history.push("/")
          window.location.reload()
        } else {
          setWronglog("wrong username or password")
        }
      })
  }

  return (
    <div className="lg-container" id = "lg-container">
      <h1>LOGIN</h1>
      <form id="lg-form" name="lg-form" onSubmit={log}>
        <div>
          <input type="text" id="username" placeholder="username"/>
        </div>
        <div>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className = "logsin-button">
          <button type="submit" id="login">Login</button>
        </div>
        <p>{wronglog}</p>
      </form>
      <form id="lg-form" name="lg-form" onClick={sign}>
        <div id = "signupinlog-button">
          <button type="submit" id="login">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default Login