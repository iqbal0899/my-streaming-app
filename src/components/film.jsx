import { useSearchParams } from "react-router-dom";
import CardFilmBaru from "../components/trendingSection";
import Navbar from "./navbar";
import Footer from "./footer";

function Film(auth, onLogout) {
  const [searchParams] = useSearchParams();

  const genre = searchParams.get("genre");

  return (
    <div>
      <Navbar auth={auth} onLogout={onLogout} />

      <CardFilmBaru
        title={genre ? `Film ${genre}` : "Semua Film"}
        genre={genre}
      />

      <Footer />
    </div>
  );
}

export default Film;
