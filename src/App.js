import React from "react";
import Login from "./Login";
import "./App.css";

class App extends React.Component {
  signIn = userData => {
    console.log(userData);
  };
  render() {
    return (
      <div className="App">
        <Login signIn={this.signIn} />
      </div>
    );
  }
}

export default App;
