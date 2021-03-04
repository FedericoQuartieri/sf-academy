import { useHistory } from "react-router-dom"

const Notlogged = () => {
  const history = useHistory()
  const signup = () => {
    history.push("/signup")
  }

  const login = (e) => {
    e.preventDefault()
    history.push("/login")
  }

  return (
    <div id = "nav-button-div">
      <form  className="form-inline my-2 my-lg-0" id = "signup" onSubmit={signup}>
        <input className="form-control mr-sm-2" type="submit" value="signup"></input>
      </form>
      <form className="form-inline my-2 my-lg-0" id = "login" onSubmit={login}>
        <input className="form-control mr-sm-2" type="submit" value="login"></input>
      </form>
    </div>
  )
}

export default Notlogged