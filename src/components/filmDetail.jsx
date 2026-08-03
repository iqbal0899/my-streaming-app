import { Play, Check, ChevronDown, X } from "lucide-react";
import "../css/filmDetail.css";

/**
 * Modal detail film/series, mirip tampilan Netflix.
 * Muncul saat salah satu card di CardFilmBaru / CardTrendingFilm diklik.
 *
 * Props:
 * - film: object film yang dipilih (id, title, image, ...)
 * - onClose: function untuk menutup modal
 */
export default function FilmDetailModal({ film, onClose }) {
  if (!film) return null;

  const {
    image,
    title,
    episodeLabel = "Episode 1",
    duration = "2j 33m",
    progress = 35, // persentase progress nonton (0-100)
    genres = ["Misteri", "Kriminal", "Fantasi"],
  } = film;

  return (
    <div className="fdm-overlay" onClick={onClose}>
      <div className="fdm-card" onClick={(e) => e.stopPropagation()}>
        <button className="fdm-close" onClick={onClose} aria-label="Tutup">
          <X size={16} />
        </button>

        <div className="fdm-hero">
          <img src={image} alt={title} />
          <div className="fdm-hero-gradient" />
          <h3 className="fdm-hero-title">{title}</h3>
        </div>

        <div className="fdm-body">
          <div className="fdm-actions">
            <button className="fdm-btn fdm-btn-play" aria-label="Putar">
              <Play size={20} fill="currentColor" />
            </button>
            <button className="fdm-btn fdm-btn-outline" aria-label="Tandai selesai ditonton">
              <Check size={18} />
            </button>
            <span className="fdm-spacer" />
            <button className="fdm-btn fdm-btn-outline" aria-label="Info lainnya">
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="fdm-meta-row">
            <span className="fdm-episode">&ldquo;{episodeLabel}&rdquo;</span>
            <span className="fdm-duration">{duration}</span>
          </div>

          <div className="fdm-progress-track">
            <div
              className="fdm-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="fdm-genres">
            {genres.map((g, i) => (
              <span key={g} className="fdm-genre">
                {g}
                {i < genres.length - 1 && <span className="fdm-dot">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}