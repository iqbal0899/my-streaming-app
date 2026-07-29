import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Users from "./components/users";
import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {
  const [auth, setAuth] = useState(null); // null = belum login, isi objek user kalau sudah login

  const handleLoginSuccess = (user) => {
    setAuth(user);
  };

  const handleLogout = () => {
    setAuth(null);
  };

  return (
  <BrowserRouter>
    <Routes>
      {/* Halaman login */}
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />

      {/* Halaman registrasi */}
      <Route path="/register" element={<Register />} />

      {/* Halaman utama setelah login */}
      <Route
        path="/home"
        element={
          auth ? (
            <>
              <Home auth={auth} onLogout={handleLogout}/>
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Halaman daftar user (CRUD) */}
      <Route
        path="/users"
        element={
          auth ? (
            <>
              <Navbar auth={auth} onLogout={handleLogout} />
              <Users />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Path tidak dikenali -> kembali ke login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;