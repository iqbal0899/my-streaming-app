import "../css/navbar.css";
import Logo from "../assets/logo.png";
import ProfileDropdown from './profileDropdown';


function Navbar({auth}) {
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
        <ProfileDropdown
          email={auth?.email}
          role="Muhammad Iqbal" />
      </div>
    </nav>
  );
}

export default Navbar;