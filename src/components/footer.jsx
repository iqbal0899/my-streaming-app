import { useState } from "react";
import "../css/footer.css";
import Logo from "../assets/Logo.png";

const GENRES = [
  "Aksi", "Drama", "Komedi", "Horor", "Thriller",
  "Fiksi Ilmiah", "Fantasi", "Romantis", "Animasi",
  "Dokumenter", "Petualangan", "Misteri",
];

const BANTUAN = ["FAQ", "Kontak Kami", "Privasi", "Syarat dan Ketentuan"];

function FooterSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="footer-section">
      <button
        type="button"
        className="footer-section__toggle"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`footer-section__chevron ${isOpen ? "is-open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <h3 className="footer-section__title">{title}</h3>

      <div className={`footer-section__content ${isOpen ? "is-open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (name) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Logo & Copyright */}
          <div className="footer__brand">
            <div className="footer__logo">
            <img src={Logo} alt='logo' className='logo'></img>
            </div>
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Chill. All Right Reserved.
            </p>
          </div>

          {/* Genre */}
          <FooterSection
            title="Genre"
            isOpen={openSection === "genre"}
            onToggle={() => toggleSection("genre")}
          >
            <div className="footer__genres">
              {GENRES.map((genre) => (
                <a key={genre} href="#" className="footer__genre-chip">
                  {genre}
                </a>
              ))}
            </div>
          </FooterSection>

          {/* Bantuan */}
          <FooterSection
            title="Bantuan"
            isOpen={openSection === "bantuan"}
            onToggle={() => toggleSection("bantuan")}
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
          </FooterSection>
        </div>

        <div className="footer__bottom">
          Dibuat dengan sepenuh hati untuk para pecinta film.
        </div>
      </div>
    </footer>
  );
}