import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profileDropdown.css"
import profile from "../assets/big-hero.png";

function ProfileDropdown({ name, email, image, subscription, onLogout }) {
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

  function handleProfileClick() {
    setOpen(false);
    navigate("/profile");
  }

  function handleSubscriptionClick() {
    setOpen(false);
    navigate("/pricing");
  }

  function handleRiwayatClick() {
    setOpen(false);
    navigate("/riwayat-transaksi");
  }

  return (
    <div className="profile-container" ref={menuRef}> 
      <img
        src={image || profile}
        alt="Profile"
        className="profile-image"
        onClick={() => setOpen(!open)}
      /> 

      {open && (
        <div className="dropdown-menu">

          <div className="dropdown-header">
            <img src={profile} alt="Profile" /> 
            <div>
              <h4>{name}</h4>
              <span>{email}</span>
            </div>
          </div>

          <hr />

          <button className="dropdown-item" onClick={handleProfileClick}>
            👤 Profile Saya
          </button>

          <button className="dropdown-item" onClick={handleSubscriptionClick}>
            {subscription?.name ? `Berlangganan ${subscription.name}` : 'Belum Berlangganan'}
          </button>

          <button className="dropdown-item" onClick={handleRiwayatClick}>
            🧾 Riwayat Transaksi
          </button>

          <button className="dropdown-item logout" onClick={onLogout}>
            🚪 Keluar
          </button>

        </div>
      )}
    </div>
  );
}

export default ProfileDropdown; 