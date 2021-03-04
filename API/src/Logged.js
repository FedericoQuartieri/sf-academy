var Logged = () => {
  const logout = () => {
    sessionStorage.removeItem("user")
    window.location.reload()
  }
  return (
    <div id = "loggediv">
      <div id = "welcome">Welcome {(sessionStorage.getItem("user").length < 12) ? sessionStorage.getItem("user") : sessionStorage.getItem("user").substring(0, 10) + "..." }</div>
      <button id = "logout" onClick={logout}>Logout</button>
    </div>
  )
}

export default Logged