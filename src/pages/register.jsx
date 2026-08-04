import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/register.css";
import Logo from "../assets/Logo.png";
import Button from "../components/button";
import GoogleButton from "../components/buttonGoogle";
import { getUsers, createUser } from "../api/userApi";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = async () => {
    if (!username.includes("@")) {
      return "Username harus berupa email (mengandung karakter @)";
    }
    if (password.length < 6) {
      return "Password minimal 6 karakter";
    }
    if (password !== confirmPassword) {
      return "Konfirmasi password tidak sama dengan password";
    }
    if (!name.trim()) {
      return "Nama tidak boleh kosong";
    }

    const users = await getUsers();
    if (users.some((u) => u.email === username)) {
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

      // Simpan akun baru ke MockAPI supaya halaman Login bisa memvalidasinya
      await createUser({ name, email: username, password });

      setSubmitting(false);

      // Setelah daftar berhasil, arahkan ke halaman Login
      navigate("/login");
    } catch (err) {
      setSubmitting(false);
      setError("Gagal terhubung ke server. Coba lagi.");
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
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Username</h3>
        <input
          type="email"
          placeholder="Masukkan email sebagai username"
          value={username ?? ""}
          onChange={(e) => setUsername(e.target.value)}
        />

        <h3>Kata Sandi</h3>
        <input
          type="password"
          placeholder="Minimal 6 karakter"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h3>Konfirmasi Kata Sandi</h3>
        <input
          type="password"
          placeholder="Ulangi kata sandi"
          value={confirmPassword ?? ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="register-error">{error}</p>}

        <div className="akun">
          <span>
            Sudah punya akun? <Link to="/login">Masuk</Link>
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