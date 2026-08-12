import { Link } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/Logo.png";
import ProfileDropdown from "./profileDropdown";

function Navbar({ auth, subscription, onLogout }) {
    console.log("AUTH DI NAVBAR:", auth);

    return (
        <nav className="navbar">

            <div className="nav-logo">
                <Link to="/home">
                    <img
                        src={Logo}
                        alt="logo"
                        className="logo"
                    />
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
                    <Link to="/users">Daftar User</Link>
                </li>
            </ul>

            <div>
                <ProfileDropdown
                    user={auth}
                    subscription={subscription}
                    onLogout={onLogout}
                />
            </div>

        </nav>
    );
}

export default Navbar;