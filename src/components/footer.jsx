import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/footer.css"
import Logo from "../assets/Logo.png";

const GENRES = [
  "Aksi", "Drama", "Komedi", "Horor", "Thriller",
  "Fiksi Ilmiah", "Fantasi", "Romantis", "Animasi",
  "Dokumenter", "Petualangan", "Misteri",
];

const BANTUAN = ["FAQ", "Kontak Kami", "Privasi", "Syarat dan Ketentuan"];

function FooterDropdown({ title, isOpen, onToggle, children }) {
  const wrapperRef = useRef(null);

  // Tutup dropdown saat klik di luar area (khusus mode mobile)
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="footer-dropdown" ref={wrapperRef}>
      {/* Trigger box, hanya tampil di mobile (mode dropdown) */}
      <button
        type="button"
        className="footer-dropdown__trigger"
        onClick={() => onToggle(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{title}</span>
       <img src={Logo} alt="logo" className="logo"/>
      </button>

      {/* Judul statis, hanya tampil di desktop */}
      <h3 className="footer-dropdown__title">{title}</h3>

      {/* Panel: overlay melayang di mobile, kolom statis di desktop */}
      <div className={`footer-dropdown__panel ${isOpen ? "is-open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name, forceState) => {
    setOpenMenu((prev) => {
      if (typeof forceState === "boolean") {
        return forceState ? name : null;
      }
      return prev === name ? null : name;
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Logo & Copyright */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={Logo} alt="logo" className="logo"/>
            </div>
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Chill. All Right Reserved.
            </p>
          </div>

          {/* Genre */}
          <FooterDropdown
            title="Genre"
            isOpen={openMenu === "genre"}
            onToggle={(state) => toggleMenu("genre", state)}
          >
            <div className="footer__genres">

              {GENRES.map((genre) => (

                <Link
                  key={genre}
                  to={`/film?genre=${encodeURIComponent(genre)}`}
                  className="footer__genre-chip"
                  onClick={() => setOpenMenu(null)}
                >
                  {genre}
                </Link>

              ))}
            </div>
          </FooterDropdown>

          {/* Bantuan */}
          <FooterDropdown
            title="Bantuan"
            isOpen={openMenu === "bantuan"}
            onToggle={(state) => toggleMenu("bantuan", state)}
          >
            <ul className="footer__list">
              {BANTUAN.map((item) => (
                <li key={item}>
                  <a href="#" className="footer__link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </FooterDropdown>
        </div>

        <div className="footer__bottom">
          Dibuat dengan sepenuh hati untuk para pecinta film.
        </div>
      </div>
    </footer>
  );
}