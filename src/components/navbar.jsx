import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/Logo.png";
import ProfileDropdown from "./profileDropdown";

function Navbar({ auth, subscription, onLogout }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const keyword = search.trim();

        if (!keyword) return;

        navigate(`/search?search=${encodeURIComponent(keyword)}`);
    };

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
                    <Link to="/series">Series</Link>
                </li>

                <li>
                    <Link to="/film">Film</Link>
                </li>

                <li>
                    <Link to="/daftar-saya">Daftar Saya</Link>
                </li>

                <li>
                    <Link to="/users">Daftar User</Link>
                </li>
            </ul>

            {/* SEARCH */}
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Cari film atau series..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button type="submit">
                    🔍
                </button>
            </form>

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