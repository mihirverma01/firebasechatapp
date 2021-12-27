import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>
        <Link to="/">Meseanger</Link>
      </h3>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/Login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
