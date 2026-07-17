import { useState } from "react";
import "../css/login.css";
import Logo from "../assets/logo.png";
import Button from "../components/button";
import GoogleButton from "../components/buttonGoogle";

 
const USERS_KEY = "registered_users";
 
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
 
function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
 
  const validate = () => {
    if (!email.includes("@")) {
      return "Email harus mengandung karakter @";
    }
    if (password.length < 6) {
      return "Password minimal 6 karakter";
    }
    return "";
  };
 
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
 
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
 
    setSubmitting(true);
 
    setTimeout(() => {
      setSubmitting(false);
 
      // Cek email & password terhadap akun yang didaftarkan lewat Register
      const users = getUsers();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
 
      if (!found) {
        setError("Email atau password salah. Belum punya akun? Daftar dulu.");
        return;
      }
 
      if (onLoginSuccess) {
        onLoginSuccess({ email, password });
      }
    }, 500);
  };
 
  return (
    <div className="container">
      <form onSubmit={handleLogin} className="login-form">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Masuk</h2>
 
        <h3>Username</h3>
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <h3>Kata Sandi</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        {error && <p className="login-error">{error}</p>}
 
        <div className="akun">
          <span>
            Belum punya akun?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToRegister && onGoToRegister();
              }}
            >
              Daftar
            </a>
          </span>
 
          <a href="#" className="forgot-password">
            Lupa kata sandi?
          </a>
        </div>
 
        <div className="mb-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Login"}
          </Button>
        </div>
 
        <p className="atau">Atau</p>

        <GoogleButton> Masuk Dengan Google</GoogleButton>

        </form>
    </div>
  );
}
 
export default Login;