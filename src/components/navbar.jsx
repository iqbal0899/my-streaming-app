import { Link } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/Logo.png";
import ProfileDropdown from "./profileDropdown";

function Navbar({ auth, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={Logo} alt="logo" className="logo" />
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
        <ProfileDropdown email={auth?.email} onLogout={onLogout} />
      </div>
    </nav>
  );
}

export default Navbar;