import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import Logo from "../assets/Logo.png";
import Button from "../components/button";
// import GoogleButton from "../components/buttonGoogle";
import { getUsers, updateUser } from "../services/api/userApi";

function Forget() {
  const [email, setEmail ] = useState("");
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleForget = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
        if (!email.trim()) {
            setError("Email Harus Diisi")
            return; 
        }

        if (!email.includes("@")) {
            setError("Email Harus Mengandung Karakter @")
            return;
        }

        if (passwordBaru.length < 6) {
            setError("Password Minimal 6 Karakter");
            setSubmitting(false)
            return;
        }

        const users = await getUsers();

        const user = users.find(
            (u) => u.email === email
        );


            

        
        //VALIDASI EMAIL
        if(!user){
            setError("Email Tidak Terdaftar")
            return;
        }

        //validasi password lama

        if (user.password !== passwordLama) {
            setError("Password salah");
            setSubmitting(false)
            return;
        }

        if (passwordBaru === passwordLama){
            setError("Password Baru Tidak Boleh Sama Dengan Password Lama")
            setSubmitting(false)
            return;
        }

        //update data ke mockAPI

        await updateUser(user.id, {
            ...user,
            password: passwordBaru,
        });

        setSuccess("Password Berhasil Diubah");

        //setelah sukses kosongkan form
        setEmail("");
        setPasswordLama("");
        setPasswordBaru("");

        //setelah update password => halaman login

        setTimeout(() => {
            navigate("/login");
        }, 1500);

      }catch (err) {
        console.error(err);
        setError("Gagal Terhubung Ke Server");
      }finally{
        setSubmitting(false);
      }
  };

  return (
    <div className="container-regis">
      <form onSubmit={handleForget} className="register-form">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Lupa Password</h2>

        <h3>Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h3>Kata Sandi Lama</h3>
        <input
          type="password"
          placeholder="Kata Sandi Lama"
          value={passwordLama ?? ""}
          onChange={(e) => setPasswordLama(e.target.value)}
        />

        <h3>Kata Sandi Baru</h3>
        <input
          type="password"
          placeholder="Minimal 6 karakter"
          value={passwordBaru ?? ""}
          onChange={(e) => setPasswordBaru(e.target.value)}
        />

        {error && <p className="register-error">{error}</p>}

        {/* <div className="akun">
          <span>
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </span>
        </div> */}

        <div className="mb-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Simpan"}
          </Button>
        </div>

        {/* <GoogleButton> Daftar Dengan Google </GoogleButton> */}
      </form>
    </div>
  );
}

export default Forget;