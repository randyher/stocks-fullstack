import React from "react";

class Home extends React.Component {
  render() {
    console.log(this.props);
    const { name } = this.props.user;
    return (
      <div className="Home">
        {this.props.user && (
          <h1>Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        )}
      </div>
    );
  }
}

export default Home;
