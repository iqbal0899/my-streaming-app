import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "../css/card-section.css";
import lookup from "../assets/dont-look-up.png";
import dead from "../assets/all-of-us.png";
import blue from "../assets/bluelock.png";
import otto from "../assets/otto.png";
import oppenheimer from "../assets/oppenheimer.jpg";
import spider from "../assets/spider.jpg";
 
const FILMS = [
  {
    id: 1,
    title: "Don't Look Up",
    rating: 4.5,
    badge: null,
    image: lookup,
  },
  {
    id: 2,
    title: "All of Us Are Dead",
    rating: 4.2,
    badge: null,
    image: dead,
  },
  {
    id: 3,
    title: "Blue Lock",
    rating: 4.6,
    badge: "Episode Baru",
    image: blue,
  },
  {
    id: 4,
    title: "A Man Called Otto",
    rating: 4.4,
    badge: null,
    image: otto,
  },
  {
    id: 5,
    title: "Oppenheimer",
    rating: 4.8,
    badge: null,
    image: oppenheimer,
  },
  {
    id: 6,
    title: "Spider-Verse",
    rating: 4.7,
    badge: "Trending",
    image: spider,
  },
];
 
function CardSectionPilihanFilm({
  title = "Melanjutkan Tonton Film",
  films = FILMS,
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
    const card = el.querySelector(".fs-card");
    const cardWidth = card ? card.getBoundingClientRect().width + 16 : 240;
    el.scrollBy({ left: direction * cardWidth * 2, behavior: "smooth" });
  };
 
  return (
    <section className="fs-wrap">
      {title && <h2 className="fs-heading">{title}</h2>}
 
      <div className="fs-row">
        <button
          className="fs-nav"
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll kiri"
        >
          <ChevronLeft size={18} />
        </button>
 
        <div className="fs-track" ref={trackRef}>
          {films.map((f) => (
            <div className="fs-card" key={f.id}>
              <img src={f.image} alt={f.title} loading="lazy" />
              {f.badge && <span className="fs-badge">{f.badge}</span>}
              <div className="fs-overlay">
                <p className="fs-title">{f.title}</p>
                <div className="fs-rating">
                  <Star size={13} />
                  <span>{f.rating}/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        <button
          className="fs-nav"
          onClick={() => scrollByCards(1)}
          disabled={!canScrollRight}
          aria-label="Scroll kanan"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default CardSectionPilihanFilm;