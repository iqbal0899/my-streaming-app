import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Users from "./components/users";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Pricing from "./components/pricingSubscriber";
import Checkout from "./components/checkout";
import Payment from "./components/payment";
import Profile from "./components/profileUsers";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(null); // null = belum login, isi objek user kalau sudah login
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMetode, setSelectedMetode] = useState("card");
  const [expiredNotice, setExpiredNotice] = useState(false);

  const handleLoginSuccess = (user) => {
    setAuth(user);
  };

  const handleLogout = () => {
    setAuth(null);
  };

  function handlePilihPaket(plan) {
    setSelectedPlan(plan);
    setExpiredNotice(false);
    navigate("/checkout");
  }

  function handleBayarCheckout(metode) {
    setSelectedMetode(metode);
    navigate("/payment");
  }

  function handleKembaliKePricing() {
    navigate("/pricing");
  }

  function handleKembaliKeCheckout() {
    navigate("/checkout");
  }

  function handleExpire() {
    setExpiredNotice(true);
    navigate("/pricing");
  }

  return (
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
              <Home auth={auth} auth={auth} onLogout={handleLogout} />
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

      {/* Halaman pilih paket langganan */}
      <Route
        path="/pricing"
        element={
          auth ? (
            <>
              <Navbar auth={auth} onLogout={handleLogout} />
              {expiredNotice && (
                <div className="expired-banner">
                  Waktu pembayaran habis. Silakan pilih paket kembali.
                </div>
              )}
              <Pricing onPilihPaket={handlePilihPaket} />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Halaman ringkasan pembayaran / pilih metode */}
      <Route
        path="/checkout"
        element={
          !auth ? (
            <Navigate to="/" replace />
          ) : !selectedPlan ? (
            <Navigate to="/pricing" replace />
          ) : (
            <>
              <Navbar auth={auth} onLogout={handleLogout} />
              <Checkout
                plan={selectedPlan}
                onKembali={handleKembaliKePricing}
                onBayar={handleBayarCheckout}
              />
            </>
          )
        }
      />

      {/* Halaman form pembayaran dengan countdown */}
      <Route
        path="/payment"
        element={
          !auth ? (
            <Navigate to="/" replace />
          ) : !selectedPlan ? (
            <Navigate to="/pricing" replace />
          ) : (
            <>
              <Navbar auth={auth} onLogout={handleLogout} />
              <Payment
                plan={selectedPlan}
                metode={selectedMetode}
                onKembali={handleKembaliKeCheckout}
                onExpire={handleExpire}
              />
            </>
          )
        }
      />

      {/* Path tidak dikenali -> kembali ke login */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route
  path="/profile"
  element={
    auth ? (
      <>
        <Navbar name={name}auth={auth} onLogout={handleLogout} />
        <Profile />
      </>
    ) : (
      <Navigate to="/" replace />
    )
  }
/>

    </Routes>
  );
}

export default App;