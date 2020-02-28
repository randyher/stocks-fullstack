import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Portfolio from "./Portfolio";
import Transaction from "./Transaction";

import Auth from "./Auth";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";

import "./App.css";
import NavBar from "./NavBar";

class App extends React.Component {
  state = {
    user: {},
    loggedIn: false,
    error: ""
  };

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => res.json())
        .then(user => {
          this.setState({ loggedIn: true, user });
        });
    }
  }

  signIn = user => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(r => r.json())
      .then(user => {
        if (user.jwt) {
          Auth.authenticateToken(user.jwt);
          this.setState({ loggedIn: true, user }, () => {
            this.props.history.push("/");
          });
        }
      });
  };

  signUp = user => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(r => r.json())
      .then(user => {
        if (user.jwt) {
          Auth.authenticateToken(user.jwt);
          this.setState({ loggedIn: true, user }, () => {
            this.props.history.push("/");
          });
        }
      });
  };

  signOut = () => {
    Auth.deauthenticateToken();
    this.setState({ loggedIn: false, user: {} }, () => {
      this.props.history.push("/login");
    });
  };

  buyStock = transactions => {
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(transactions)
    })
      .then(res => res.json())
      .then(transaction => {
        console.log(transaction);
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar signOut={this.signOut} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route
            path="/signup"
            render={() =>
              this.state.loggedIn ? (
                <div>{this.props.history.push("/")}</div>
              ) : (
                <Signup signUp={this.signUp} />
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              this.state.loggedIn ? (
                <div>{this.props.history.push("/")}</div>
              ) : (
                <Login signIn={this.signIn} />
              )
            }
          />

          <Route
            path="/transactions"
            render={() =>
              this.state.loggedIn ? (
                <Transaction {...this.state.user} />
              ) : (
                <div>{this.props.history.push("/")}</div>
              )
            }
          />

          <Route
            path="/"
            render={() =>
              this.state.loggedIn ? (
                <div>
                  <Portfolio {...this.state.user} buyStock={this.buyStock} />
                </div>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
