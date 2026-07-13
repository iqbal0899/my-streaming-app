
import "../css/home.css"
import Navbar from "../components/navbar";
import Hero from "../components/hero-content";
import Card from "../components/card-section";
import Footer from "../components/footer";



const continueWatching = [
  { id: 1, title: "Don't Look Up", rating: 4.5, poster: "https://picsum.photos/seed/dontlookup/300/450" },
  { id: 2, title: "Blue Lock", rating: 4.6, badge: "Episode Baru", poster: "https://picsum.photos/seed/bluelock/300/450" },
  { id: 3, title: "The Batman", rating: 4.2, poster: "https://picsum.photos/seed/batman/300/450" },
  { id: 4, title: "A Man Called Otto", rating: 4.4, poster: "https://picsum.photos/seed/otto/300/450" },
];
 
const topRating = [
  { id: 5, title: "Suzume", badge: "Episode Baru", poster: "https://picsum.photos/seed/suzume/300/450" },
  { id: 6, title: "Jurassic World Dominion", poster: "https://picsum.photos/seed/jurassic/300/450" },
  { id: 7, title: "Sonic the Hedgehog 2", poster: "https://picsum.photos/seed/sonic/300/450" },
  { id: 8, title: "All of Us Are Dead", badge: "Episode Baru", poster: "https://picsum.photos/seed/allofus/300/450" },
  { id: 9, title: "Big Hero 6", poster: "https://picsum.photos/seed/bighero/300/450" },
];
 
function Home() { {
  return (

    <div home>
    <Navbar />

    <Hero />

    <div style={{ background: "#0b0c10", minHeight: "100vh", paddingBottom: 40 }}>
      <Card
        title="Melanjutkan Tonton Film"
        items={continueWatching}
        highlighted
      />
      <Card
        title="Top Rating Film dan Series Hari ini"
        items={topRating}
      />
    </div>
    <Footer />
    </div>
  );
}
};






export default Home;