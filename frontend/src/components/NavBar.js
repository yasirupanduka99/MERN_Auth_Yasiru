import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (

    <header>
        <div className="container">
            <Link to='/'>
                <h1>MERN Authentication</h1>
            </Link>
            <nav>
              <div>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/signup">
                  Signup
                </Link>
              </div>
            </nav>
        </div>
    </header>

  )
};

export default NavBar;
