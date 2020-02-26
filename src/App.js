import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Switch, Redirect, Route } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  signIn = userData => {
    console.log(userData);
  };

  signUp = userData => {
    console.log(userData);
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/signup"
            render={() => {
              return <Signup signUp={this.signUp} />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <Login logIn={this.signIn} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
