import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/login";
import Register from "./pages/register";
import Forget from "./pages/lupaPassword";
import Users from "./components/users";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Pricing from "./transactions/pricingSubscriber";
import Checkout from "./transactions/checkout";
import Payment from "./transactions/payment";
import Profile from "./components/profileUsers";
import RiwayatTransaksi from "./report/transactionHistory";
import Search from "./components/search";
import Film from "./components/film";
import ResetPassword from "./components/reset-password";
import VerifyEmail from "./components/verifyEmail";
import { loginSuccess, logout, confirmPayment } from "./store/authSlice";
import {
  pilihPaket,
  pilihMetode,
  setExpiredNotice,
} from "./store/checkoutSlice";

// Cek apakah user punya sesi pembayaran yang masih berjalan (belum expired,
// belum sukses) untuk paket yang sedang dipilih. Sumbernya deadline yang
// disimpan payment.jsx ke localStorage, key: paymentDeadline_{email}_{planId}.
function getActivePaymentInfo(auth, selectedPlan) {
  if (!selectedPlan) return null;
  const authKey = auth?.email || "guest";
  const deadlineKey = `paymentDeadline_${authKey}_${selectedPlan.id}`;
  const deadline = Number(localStorage.getItem(deadlineKey));
  if (deadline && deadline > Date.now()) {
    return { plan: selectedPlan, deadline };
  }
  return null;
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
  const dispatch = useDispatch();

  // Ambil semua state dari Redux store (menggantikan useState sebelumnya)
  const auth = useSelector((state) => state.auth.auth);
  const selectedPlan = useSelector((state) => state.checkout.selectedPlan);
  const selectedMetode = useSelector((state) => state.checkout.selectedMetode);
  const expiredNotice = useSelector((state) => state.checkout.expiredNotice);

  const activePayment = getActivePaymentInfo(auth, selectedPlan);

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");
    if (auth && lastRoute && location.pathname === "/") {
      navigate(lastRoute, { replace: true });
    }
  }, [auth, navigate, location.pathname]);

  const handleLoginSuccess = (user) => {
    dispatch(loginSuccess(user));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  // Dipanggil dari halaman Payment saat pembayaran berhasil dikonfirmasi.
  function handlePaymentSuccess(plan) {
    dispatch(confirmPayment(plan));
  }

  function handlePilihPaket(plan) {
    if (activePayment && activePayment.plan.id !== plan.id) {
      alert(
        `Kamu masih punya pembayaran yang belum selesai untuk paket "${activePayment.plan.name}". Selesaikan dulu sebelum memilih paket lain.`,
      );
      navigate("/payment");
      return;
    }
    dispatch(pilihPaket(plan));
    navigate("/checkout");
  }

  function handleLanjutkanPembayaran() {
    navigate("/payment");
  }

  function handleBayarCheckout(metode) {
    dispatch(pilihMetode(metode));
    navigate("/payment");
  }

  function handleKembaliKePricing() {
    navigate("/pricing");
  }

  function handleKembaliKeCheckout() {
    navigate("/checkout");
  }

  function handleExpire() {
    dispatch(setExpiredNotice(true));
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
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Halaman registrasi */}
      <Route path="/register" element={<Register />} />

      {/* Halaman lupa password */}
      <Route path="/forget" element={<Forget />} />

      {/* Halaman utama setelah login */}
      <Route
        path="/home"
        element={
          auth ? (
            <>
              <Home auth={auth} onLogout={handleLogout} />
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
              <Pricing
                onPilihPaket={handlePilihPaket}
                activePayment={activePayment}
                onLanjutkan={handleLanjutkanPembayaran}
              />
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
                onExpire={handleExpire}
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
              <Navbar auth={auth} onLogout={handleLogout} />
              <Profile />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Halaman riwayat transaksi user */}
      <Route
        path="/riwayat-transaksi"
        element={
          auth ? (
            <>
              <Navbar auth={auth} onLogout={handleLogout} />
              <RiwayatTransaksi />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Path tidak dikenali -> kembali ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="/search" element={<Search />} />
      <Route path="/film" element={<Film />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/verify-email/:token" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
