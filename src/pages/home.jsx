
import "../css/home.css"
import Navbar from "../components/navbar";
import Hero from "../components/hero-content";
import Card from "../components/card-section";
import Trending from "../components/trendingSection";
import Footer from "../components/footer";


function Home({ auth }){
  return(
    <div className="Home">
    <Navbar auth={auth} />
    <Hero />
    <Card />
    <Trending />
    <Footer />
    </div>
  )
}






export default Home;