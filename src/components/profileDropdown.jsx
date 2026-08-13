import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profileDropdown.css";
import profileDefault from "../assets/big-hero.png";

function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLogout = () => {
    setOpen(false);
    onLogout && onLogout();
  };

  const displayName = user?.nama || "Pengguna";
  const displayEmail = user?.email || "-";

  console.log("USER DROPDOWN:", user);
console.log("FOTO DROPDOWN:", user?.foto_profile);
console.log(
  "URL FOTO:",
  user?.foto_profile
    ? `${import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "")}/uploads/${user.foto_profile}`
    : "Tidak ada foto"
);

  const displayPhoto = user?.foto_profile
    ? `${import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "")}/uploads/${user.foto_profile}`
    : profileDefault;

  return (
    <div className="profile-container" ref={menuRef}>
      <img
        src={displayPhoto}
        alt="Profile"
        className="profile-image"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img src={displayPhoto} alt="Profile" />
            <div>
              <h4>{displayName}</h4>
              <span>{displayEmail}</span>
            </div>
          </div>

          <hr />

          <button
            className="dropdown-item"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            👤 Profile Saya
          </button>
          <button className="dropdown-item">⭐ Premium</button>
          <button className="dropdown-item logout" onClick={handleLogout}>
            🚪 Keluar
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
