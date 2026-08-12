import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import Logo from "../assets/Logo.png";
import Button from "../components/button";
import GoogleButton from "../components/buttonGoogle";
import { loginUser } from "../services/api/userApi";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!email.includes("@")) {
      return "Email harus mengandung karakter @";
    }
    if (password.length < 6) {
      return "Password minimal 6 karakter";
    }
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      // Validasi email & password dilakukan di server (bukan di browser lagi)
      const result = await loginUser({ email, password });

      localStorage.setItem("token", result.token);

      onLoginSuccess && onLoginSuccess(result.user);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    } finally {
      setSubmitting(false);
    }
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
            Belum punya akun? <Link to="/register">Daftar</Link>
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