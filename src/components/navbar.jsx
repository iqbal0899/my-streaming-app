import {useState} from 'react';
import "../css/navbar.css";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MyWebsite</h2>
      </div>

      <ul className="nav-links">
        <li><a href="#">Series</a></li>
        <li><a href="#">Film</a></li>
        <li><a href="#">Daftar Saya</a></li>
      </ul>

      <button className="login-btn">
        Login
      </button>
    </nav>
  );
}

export default Navbar;