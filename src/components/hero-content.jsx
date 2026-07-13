import { useState } from "react";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import "../css/hero-content.css";
import Hero from "../assets/duty-after-school.png";

 
export default function TitleHeroCard({
  background = Hero,
  title = "Duty After School",
  description =
    "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
  rating = "18+",
}) {
  const [muted, setMuted] = useState(true);
 
  return (
    <div className="thc-wrap">
        <div className="thc-card">
        <div className="thc-bg"  
         style={{
            backgroundImage: `url(${background})`,
          }}
          /> 
        <div className="thc-fog" />
        
 
        <div className="thc-content">
          <h1>{title}</h1>
          <p>{description}</p>
 
          <div className="thc-actions">
            <button className="thc-play">
              <Play size={15} className="fill-current" />
              Mulai
            </button>
            <button className="thc-info">
              <Info size={14} />
              Selengkapnya
            </button>
            <button className="thc-rating">{rating}</button>
            <button
              className="thc-volume"
              aria-label={muted ? "Aktifkan suara" : "Matikan suara"}
              onClick={() => setMuted((m) => !m)}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}