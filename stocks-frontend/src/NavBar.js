import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const finalLi = {
    "margin-right": "4rem"
  };
  console.log(props);
  return (
    <div className="navbar">
      {props.loggedIn ? (
        <ul className="nav-ul">
          <li style={finalLi} className="nav-li" onClick={props.signOut}>
            <a>Log Out</a>
          </li>
          <li className="nav-li">
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li className="nav-li">
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li style={finalLi} className="nav-li">
            <Link to="/login">Sign In</Link>
          </li>
          <li className="nav-li">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
