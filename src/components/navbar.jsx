import { Link } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/Logo.png";
import ProfileDropdown from "./profileDropdown";

function Navbar({ auth, subscription, onLogout}) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/home">
        <img src={Logo} alt="logo" className="logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#">Series</a>
        </li>
        <li>
          <a href="#">Film</a>
        </li>
        <li>
          <a href="#">Daftar Saya</a>
        </li>
        <li>
          {/* Pindah ke halaman Users (route "/users") */}
          <Link to="/users">Daftar User</Link>
        </li>
      </ul>

      <div>
        <ProfileDropdown
          name={auth?.name}
          email={auth?.email}
          subscription={subscription}
          onLogout={onLogout}
        />
      </div>
      
    </nav>

  );
}

export default Navbar;