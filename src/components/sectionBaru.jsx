import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/trendingSection.css";
import Mermaid from "../assets/mermaid.png";
import Duty from "../assets/duty.png";
import Big from "../assets/big-hero.png";
import Dead from "../assets/dead.png";
import Missing from "../assets/missing.png";
import Guardian from "../assets/guardian.png";


     
    const RILIS = [
      {
        id: 1,
        title: "The Little Mermaid",
        badge: "Top 10",
        image: Mermaid,
      },

      {
        id: 2,
        title: "Duty After School",
        badge: "Episode Baru",
        image: Duty,
      },

      {
        id: 3,
        title: "Big Hero 6",
        badge: null,
        image: Big,
      },

      {
        id: 4,
        title: "All of Us Are Dead",
        badge: "Episode Baru",
        image: Dead,
      },

      {
        id: 5,
        title: "Missing",
        badge: null,
        image: Missing,
      },

      {
        id: 6,
        title: "Guardian Of Galaxy",
        badge: "Top 10",
        image: Guardian,
      },
    ];
    


export default function CardSeriesFilm({
    title = "Top Rating Film dan Series Hari Ini",
    films = RILIS,
}) {
    const trackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateArrows = () => {
        const i = trackRef.current;
        if (!i) return;
        setCanScrollLeft(i.scrollLeft > 4);
        setCanScrollRight(i.scrollLeft + i.clientWidht < i.scolWidht - 4);
    };

    useEffect(() => {
        updateArrows();
        const i = trackRef.current;
        if (!i) return;
        i.addEventListener("scroll", updateArrows, {passive: true});
        window.addEventListener("resize", updateArrows);
    return () => {
      i.removeEventListener("scroll", updateArrows);
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
            <div className="tf-card" key={f.id}>
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
    </section>
  );
}

