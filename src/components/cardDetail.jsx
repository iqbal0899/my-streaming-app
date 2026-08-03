import { Play, Check, ChevronDown, X, Star } from "lucide-react";
import "../css/cardDetail.css";

export default function FilmDetail({ film, onClose }) {
  if (!film) return null;

  const {
    image,
    title,
    rating,
    episodeLabel = "Episode 1",
    duration = "2j 33m",
    progress = 35, // persentase progress nonton (0-100)
    genres = ["Misteri", "Kriminal", "Fantasi"],
  } = film;

  return (
    <div className="fd-overlay" onClick={onClose}>
      <div className="fd-card" onClick={(e) => e.stopPropagation()}>
        <button className="fd-close" onClick={onClose} aria-label="Tutup">
          <X size={16} />
        </button>

        <div className="fd-hero">
          <img src={image} alt={title} />
          <div className="fd-hero-gradient" />
          {rating != null && (
            <div className="fd-rating">
              <Star size={13} />
              <span>{rating}/5</span>
            </div>
          )}
          <h3 className="fd-hero-title">{title}</h3>
        </div>

        <div className="fd-body">
          <div className="fd-actions">
            <button className="fd-btn fd-btn-play" aria-label="Putar">
              <Play size={20} fill="currentColor" />
            </button>
            <button className="fd-btn fd-btn-outline" aria-label="Tandai selesai ditonton">
              <Check size={18} />
            </button>
            <span className="fd-spacer" />
            <button className="fd-btn fd-btn-outline" aria-label="Info lainnya">
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="fd-meta-row">
            <span className="fd-episode">&ldquo;{episodeLabel}&rdquo;</span>
            <span className="fd-duration">{duration}</span>
          </div>

          <div className="fd-progress-track">
            <div
              className="fd-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="fd-genres">
            {genres.map((g, i) => (
              <span key={g} className="fd-genre">
                {g}
                {i < genres.length - 1 && <span className="fd-dot">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}