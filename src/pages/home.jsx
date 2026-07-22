
import "../css/home.css"
// import Navbar from "../components/navbar";
// import Hero from "../components/hero-content";
// import Card from "../components/card-section";
// import Series from "../components/sectionSeries";
// import Trending from "../components/trendingSection";
// import Baru from "../components/sectionBaru";
import Users from "../components/users";
import Footer from "../components/footer";


function Home(){
  return(
    <div className="Home">
    {/* <Navbar auth={auth} /> */}
    {/* <Hero />
    <Card />
    <Series />
    <Trending />
    <Baru /> */}
    <Users />
    <Footer />
    </div>
  )
}






export default Home;