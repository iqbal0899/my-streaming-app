import "../css/navbar.css";
import Logo from "../assets/Logo.png";
import ProfileDropdown from './profileDrowpdown';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={Logo} alt='logo' className='logo'></img>
        </div>
   

      <ul className='nav-links'>
        <li><a href="#">Series</a></li>
        <li><a href="#">Film</a></li>
        <li><a href="#">Daftar Saya</a></li>
      </ul>


      <div>
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export default Navbar;