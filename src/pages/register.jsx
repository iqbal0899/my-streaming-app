import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/register.css";
import Logo from "../assets/Logo.png";
import Button from "../components/button";
import GoogleButton from "../components/buttonGoogle";
import { getUsers, createUser } from "../services/api/userApi";

function Register() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")// dipakai sebagai email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = async () => {
    if (!nama.trim()) {
      return "Nama tidak boleh kosong";
    }
    if (!username.trim()) {
      return "username harus diisi";
    }
    if (!email.includes("@")) {
      return "Email harus berupa (mengandung karakter @)";
    }
    if (password.length < 6) {
      return "Password minimal 6 karakter";
    }
    if (password !== confirmPassword) {
      return "Konfirmasi password tidak sama dengan password";
    }

    const users = await getUsers();
    if (users.some((u) => u.email === email)) {
      return "Email ini sudah terdaftar, silakan login";
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const validationError = await validate();
      if (validationError) {
        setError(validationError);
        setSubmitting(false);
        return;
      }

      await createUser({ nama, username, email: email, password });

      setSubmitting(false);
      navigate("/"); // balik ke halaman Login
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Gagal terhubung ke server. Coba lagi.");
      console.error(err);
    }
  };

  return (
    <div className="container-regis">
      <form onSubmit={handleRegister} className="register-form">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Daftar Akun</h2>

        <h3>Nama Lengkap</h3>
        <input
          type="text"
          placeholder="Masukkan nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <h3>Username</h3>
        <input
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <h3>Email</h3>
        <input
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            Sudah punya akun? <Link to="/">Masuk</Link>
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