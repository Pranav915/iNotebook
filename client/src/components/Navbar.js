import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";


 const Navbar = () => {
   let location = useLocation();
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={location.pathname==="/"?"nav-link active":"nav-link"} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={location.pathname==="/about"?"nav-link active":"nav-link"} to="about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-light" type="submit">
            <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;