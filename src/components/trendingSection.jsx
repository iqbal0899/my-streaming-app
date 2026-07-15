import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/trendingSection.css";
import Suzume from "../assets/suzume.png";
import Jurassic from "../assets/jurassic.png";
import Sonic from "../assets/sonic.png";
import Dead from "../assets/dead.png";
import BigHero from "../assets/big-hero.png";
 
const TRENDING = [
  {
    id: 1,
    title: "Suzume",
    badge: "Episode Baru",
    image: Suzume,
  },
  {
    id: 2,
    title: "Jurassic World",
    badge: null,
    image: Jurassic,
  },
  {
    id: 3,
    title: "Sonic the Hedgehog 2",
    badge: null,
    image: Sonic,
  },
  {
    id: 4,
    title: "All of Us Are Dead",
    badge: "Episode Baru",
    image: Dead,
  },
  {
    id: 5,
    title: "Big Hero 6",
    badge: "Top 10",
    image: BigHero,
  },
  {
    id: 6,
    title: "Encanto",
    badge: null,
    image: "https://picsum.photos/seed/encanto/300/420",
  },
];
 
export default function CardTrendingFilm({
  title = "Top Rating Film dan Series Hari ini",
  films = TRENDING,
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
 
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