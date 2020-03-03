import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Portfolio from "./Portfolio";
import Transaction from "./Transaction";
import { Loader, Dimmer } from "semantic-ui-react";

import Auth from "./Auth";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";

import "./App.css";
import NavBar from "./NavBar";

class App extends React.Component {
  state = {
    user: {},
    loggedIn: false,
    inError: "",
    upError: ""
  };

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      fetch("https://stock-backend-api.herokuapp.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(res => res.json())
        .then(user => {
          this.setState({ loggedIn: true, user, loaded: true });
        });
    } else {
      this.setState({ loaded: true });
    }
  }

  signIn = user => {
    fetch("https://stock-backend-api.herokuapp.com/login", {
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
          this.setState(
            { loggedIn: true, user, inError: "", upError: "" },
            () => {
              this.props.history.push("/");
            }
          );
        } else {
          console.log(user);
          this.setState({ inError: user.error });
        }
      });
  };

  signUp = user => {
    fetch("https://stock-backend-api.herokuapp.com/users", {
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
          this.setState(
            { loggedIn: true, user, inError: "", upError: "" },
            () => {
              this.props.history.push("/");
            }
          );
        } else {
          this.setState({ upError: user.error });
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
    fetch("https://stock-backend-api.herokuapp.com/transactions", {
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
        this.setState(
          {
            user: {
              user: {
                ...this.state.user.user,
                balance: transaction.current_balance,
                transactions: [
                  ...this.state.user.user.transactions,
                  transaction.transaction
                ]
              }
            }
          },
          () => {}
        );
        // this.props.history.push("/");
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
              this.state.loaded ? (
                this.state.loggedIn ? (
                  <div>{this.props.history.push("/")}</div>
                ) : (
                  <Signup signUp={this.signUp} error={this.state.upError} />
                )
              ) : (
                <Dimmer active inverted>
                  <Loader inverted content="Loading" />
                </Dimmer>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              this.state.loaded ? (
                this.state.loggedIn ? (
                  <div>{this.props.history.push("/")}</div>
                ) : (
                  <Login signIn={this.signIn} error={this.state.inError} />
                )
              ) : (
                <Dimmer active inverted>
                  <Loader inverted content="Loading" />
                </Dimmer>
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
