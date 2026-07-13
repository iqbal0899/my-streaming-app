import { useState, useRef, useEffect } from "react";
import "../css/profileDropdown.css"
import profile from "../assets/big-hero.png";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

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

  return (
    <div className="profile-container" ref={menuRef}> 
      <img
        src={profile}
        alt="Profile"
        className="profile-image"
        onClick={() => setOpen(!open)}
      /> 

      {open && (
        <div className="dropdown-menu">

          <div className="dropdown-header">
            <img src={profile} alt="Profile" /> 
            <div>
              <h4>Muhammad Iqbal</h4>
              <span>Web Developer</span>
            </div>
          </div>

          <hr />

          <button className="dropdown-item">
            👤 Profile Saya
          </button>

          <button className="dropdown-item">
            ⭐ Premium
          </button>

          <button className="dropdown-item logout">
            🚪 Keluar
          </button>

        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;