import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
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
import { updateSubscription } from "./api/userApi";

// Anggap "belum berlangganan" kalau kosong/null/undefined ATAU objeknya
// tidak punya field "name" (mis. MockAPI menyimpan {} bukan null secara default)
function normalizeSubscription(sub) {
  return sub && sub.name ? sub : null;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;}); // null = belum login, isi objek user kalau sudah login

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const plan = localStorage.getItem("selectedPlan");
    return plan ? JSON.parse(plan) : null;});


  const [selectedMetode, setSelectedMetode] = useState(() => {
    return localStorage.getItem("selectedMetode") || "card";});
  
  
  const [expiredNotice, setExpiredNotice] = useState(false);

  // Status langganan user yang sedang login (null = belum berlangganan)
  // Sumber utamanya field "subscription" pada data user di MockAPI,
  // yang ikut tersimpan di localStorage("currentUser") saat login.
  const [subscription, setSubscription] = useState(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) return null;
    return normalizeSubscription(JSON.parse(user).subscription);
  });

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
      }, [location]);

  
  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");
    if (auth && lastRoute && location.pathname === "/") {
    navigate(lastRoute, { replace: true }); 
    }}, 
    [auth, navigate, location.pathname]);

  const handleLoginSuccess = (user) => {
  setAuth(user);
  localStorage.setItem("currentUser", JSON.stringify(user));
  setSubscription(normalizeSubscription(user.subscription));
  };

  const handleLogout = () => {
  setAuth(null);
  localStorage.removeItem("currentUser");
  setSubscription(null);
  };

  // Dipanggil dari halaman Payment saat pembayaran berhasil dikonfirmasi.
  // Simpan status langganan ke MockAPI supaya persisten & ikut ke device/login lain.
  async function handlePaymentSuccess(plan) {
    setSubscription(plan); // update UI dulu biar terasa instan
    if (!auth?.id) return;
    try {
      const updatedUser = await updateSubscription(auth.id, plan);
      setAuth(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Gagal menyimpan status langganan ke MockAPI:", err);
    }
  }

  function handlePilihPaket(plan) {
  setSelectedPlan(plan);
  localStorage.setItem("selectedPlan", JSON.stringify(plan));
  setExpiredNotice(false);
  navigate("/checkout");
  }

  function handleBayarCheckout(metode) {
  setSelectedMetode(metode);
  localStorage.setItem("selectedMetode", metode);
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
      {/* Halaman root -> arahkan sesuai status login */}
      <Route
        path="/"
        element={<Navigate to={auth ? "/home" : "/login"} replace />}
      />

      {/* Halaman login */}
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

      {/* Halaman registrasi */}
      <Route path="/register" element={<Register />} />

      {/* Halaman utama setelah login */}
      <Route
        path="/home"
        element={
          auth ? (
            <>
              <Home auth={auth} subscription={subscription} onLogout={handleLogout} />
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
              <Navbar auth={auth} subscription={subscription} onLogout={handleLogout} />
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
              <Navbar auth={auth} subscription={subscription} onLogout={handleLogout} />
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
              <Navbar auth={auth} subscription={subscription} onLogout={handleLogout} />
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
              <Navbar auth={auth} subscription={subscription} onLogout={handleLogout} />
              <Payment
                plan={selectedPlan}
                metode={selectedMetode}
                auth={auth}
                onKembali={handleKembaliKeCheckout}
                onExpire={handleExpire}
                onSuccess={handlePaymentSuccess}
              />
            </>
          )
        }
      />

      {/* Halaman profil user */}
      <Route
        path="/profile"
        element={
          auth ? (
            <>
              <Navbar auth={auth} subscription={subscription} onLogout={handleLogout} />
              <Profile subscription={subscription} />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Path tidak dikenali -> kembali ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;