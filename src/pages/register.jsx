import { useState } from "react";
import "../css/register.css";
import Logo from "../assets/Logo.png";
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

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function Register({ onRegisterSuccess, onGoToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!username.includes("@")) {
      return "Username harus berupa email (mengandung karakter @)";
    }
    if (password.length < 6) {
      return "Password minimal 6 karakter";
    }
    if (password !== confirmPassword) {
      return "Konfirmasi password tidak sama dengan password";
    }
    if (getUsers().some((u) => u.email === username)) {
      return "Email ini sudah terdaftar, silakan login";
    }
    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      // Simpan akun baru supaya halaman Login bisa memvalidasinya
      saveUser({ email: username, password });
      setSubmitting(false);

      if (onRegisterSuccess) {
        onRegisterSuccess({ email: username, password });
      }
    }, 400);
  };

  return (
    <div className="container-regis">
      <form onSubmit={handleRegister} className="register-form">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Daftar Akun</h2>

        <h3>Username</h3>
        <input
          type="email"
          placeholder="Masukkan email sebagai username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <h3>Kata Sandi</h3>
        <input
          type="password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h3>Konfirmasi Kata Sandi</h3>
        <input
          type="password"
          placeholder="Ulangi kata sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="register-error">{error}</p>}

        <div className="akun">
          <span>
            Sudah punya akun?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToLogin && onGoToLogin();
              }}
            >
              Masuk
            </a>
          </span>
        </div>

        <div className="mb-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Daftar"}
          </Button>
        </div>

        <GoogleButton> Daftar Dengan Google </GoogleButton>
      </form>
    </div>
  );
}

export default Register;