import React from "react";

function NavBar(props) {
  const finalLi = {
    "margin-right": "4rem"
  };
  console.log(props);
  return (
    <div className="navbar">
      {props.loggedIn ? (
        <ul className="nav-ul">
          <li style={finalLi} className="nav-li">
            <a href="#log-out">Log Out</a>
          </li>
          <li className="nav-li">
            <a href="#portfolio">Portfolio</a>
          </li>
          <li className="nav-li">
            <a href="#transaction">Transactions</a>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li style={finalLi} className="nav-li">
            <a href="#log-out">Sign In</a>
          </li>
          <li className="nav-li">
            <a href="#portfolio">Sign Up</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
