import { useState } from "react";
// import Login from "./pages/login";
// import Register from "./pages/register";
import Home from "./pages/home";
 
function App() {
  // const [view, setView] = useState("login"); // "login" | "register"
  // const [auth, setAuth] = useState(null); // null = belum login
 
  // const handleLoginSuccess = ({ email, password }) => {
  //   setAuth({ email, password });
  // };
 
  // const handleRegisterSuccess = () => {
  //   // Setelah daftar berhasil, arahkan balik ke halaman Login
  //   setView("login");
  // };
 
  // if (!auth) {
  //   if (view === "register") {
  //     return (
  //       <Register
  //         onRegisterSuccess={handleRegisterSuccess}
  //         onGoToLogin={() => setView("login")}
  //       />
  //     );
  //   }
  //   return (
  //     <Login
  //       onLoginSuccess={handleLoginSuccess}
  //       onGoToRegister={() => setView("register")}
  //     />
  //   );
  // }
  return (
    <div>
      
      <Home />

    </div>
  )
}

export default App;