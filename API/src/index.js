import App from "./App"
import Signup from "./Signup"
import Login from "./Login"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
)