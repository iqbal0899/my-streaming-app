import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/trendingSection.css";
import FilmDetail from "./filmDetail";
import Mermaid from "../assets/mermaid.png";
import Duty from "../assets/duty.png";
import Big from "../assets/big-hero.png";
import Dead from "../assets/dead.png";
import Missing from "../assets/missing.png";
import Guardian from "../assets/guardian.png";
import Jurassic from "../assets/jurassic.png";

const BARU = [
  {
    id: 1,
    title: "The Little Mermaid",
    genre: "Fantasi",
    badge: "Top 10",
    image: Mermaid,
  },

  {
    id: 2,
    title: "Duty After School",
    genre: "Drama",
    badge: "Episode Baru",
    image: Duty,
  },

  {
    id: 3,
    title: "Big Hero 6",
    genre: "Animasi",
    badge: null,
    image: Big,
  },

  {
    id: 4,
    title: "All of Us Are Dead",
    genre: "Horor",
    badge: "Episode Baru",
    image: Dead,
  },

  {
    id: 5,
    title: "Missing",
    genre: "Misteri",
    badge: null,
    image: Missing,
  },

  {
    id: 6,
    title: "Guardian Of Galaxy",
    genre: "Fiksi Ilmiah",
    badge: "Top 10",
    image: Guardian,
  },

  {
    id: 7,
    title: "Jurassic World",
    genre: "Petualangan",
    badge: null,
    image: Jurassic,
  },
];

export default function CardFilmBaru({
  title = "Baru Rilis",
  films = BARU,
  genre = null,
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const filteredFilms = genre
  ? films.filter(
      (film) =>
        film.genre.toLowerCase() === genre.toLowerCase()
    )
  : films;

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCards = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".tf-card");
    const cardWidth = card ? card.getBoundingClientRect().width + 14 : 200;
    el.scrollBy({ left: direction * cardWidth * 2, behavior: "smooth" });
  };

  

  return (
    <section className="tf-wrap">
      {title && <h2 className="tf-heading">{title}</h2>}

      <div className="tf-row">
        <button
          className="tf-nav"
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll kiri"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="tf-track" ref={trackRef}>
          {filteredFilms.map((f) => (
            <div
              className="tf-card"
              key={f.id}
              onClick={() => setSelectedFilm(f)}
              role="button"
              tabIndex={0}
            >
              <img src={f.image} alt={f.title} loading="lazy" />
              {f.badge && (
                <span
                  className={`tf-badge${f.badge === "Top 10" ? " top10" : ""}`}
                >
                  {f.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          className="tf-nav"
          onClick={() => scrollByCards(1)}
          disabled={!canScrollRight}
          aria-label="Scroll kanan"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <FilmDetail film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </section>
  );
}
