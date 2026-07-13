import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "../css/card-section.css";

/**
 * CardSection
 * Baris horizontal berisi kartu film/series dengan tombol panah kiri-kanan,
 * mirip pola "Melanjutkan Tonton" / "Top Rating" pada halaman streaming.
 *
 * items: [{
 *   id, title, poster, rating, badge (opsional, mis. "Episode Baru")
 * }]
 */
export default function CardSection({ title, items = [], highlighted = false }) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.9 * dir;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className={`cs-section ${highlighted ? "cs-highlighted" : ""}`}>
      <h2 className="cs-title">{title}</h2>

      <div className="cs-row">
        <button
          className="cs-nav cs-nav-left"
          aria-label="Sebelumnya"
          onClick={() => scrollByAmount(-1)}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="cs-track" ref={trackRef}>
          {items.map((item) => (
            <article className="cs-card" key={item.id}>
              <div
                className="cs-poster"
                style={{ backgroundImage: `url(${item.poster})` }}
              >
                {item.badge && <span className="cs-badge">{item.badge}</span>}
              </div>

              <div className="cs-info">
                <span className="cs-name">{item.title}</span>
                {item.rating && (
                  <span className="cs-rating">
                    <Star size={12} className="cs-star" />
                    {item.rating}/5
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <button
          className="cs-nav cs-nav-right"
          aria-label="Berikutnya"
          onClick={() => scrollByAmount(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}