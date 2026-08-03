import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/trendingSection.css";
import FilmDetail from "./filmDetail";
import War from "../assets/war.png";
import Ant from "../assets/ant-man.png";
import Galaxy from "../assets/guardian.png";
import Mermaid from "../assets/mermaid.png";
import Otto from "../assets/otto-man.png";


const TRENDING = [
    {
        id: 1,
        title: "The Tomorrow War",
        badge: "Top 10",
        image: War,
    },

    {
        id: 2,
        title: "Ant-Man : Quantumania",
        badge: "Top 10",
        image: Ant,
    },

    {
        id: 3,
        title: "Guardian Of Galaxy",
        badge: "Top 10",
        image: Galaxy,
    },

    {
        id: 4,
        title: "The Little Mermaid",
        badge: "Top 10",
        image: Mermaid,
    },

    {
        id: 5,
        title: "A Man Called Otto",
        badge: "Top 10",
        image: Otto,
    },

    {
        id: 6,
        title: "Ant-Man : Quantumania",
        badge: "Top 10",
        image: Ant,
    },

    {
        id: 7,
        title: "Guardian Of Galaxy",
        badge: "Top 10",
        image: Galaxy,
    },

    ];
 
export default function CardTrendingFilm({
  title = "Film Trending",
  films = TRENDING,
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);
 
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
          {films.map((f) => (
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

      <FilmDetail
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
      />
    </section>
  );
}