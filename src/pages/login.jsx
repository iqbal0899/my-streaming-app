import {useState} from 'react';
import "../css/login.css";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import "../components/button";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [submitting, setSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (email === 'admin@gmail.com' && password === 'password') {
        alert('Login successful!');
    }else{
        alert('Email atau Password Salah');
    }
};

return(
    <div className="container">
    <form onSubmit={handleLogin} className="login-form">
        <img src={Logo} alt="Logo" className="logo" />
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Masukan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="akun">
                <span>Belum punya akun?
                <a href="#">Daftar</a>
                 </span>

                <a href="#" class="forgot-password">Lupa kata sandi?</a>
           </div>

            <div className='mb-3'>
                <button type="submit" variant="primary" fullWidth disabled={submitting}>
                    {submitting ? 'Loading...' : 'Login'}
                </button>
            </div>


            <p className="atau">Atau</p>


            <button type="button" className="login-google"> <img src={google} alt="Google Logo"></img> Login dengan Google</button>
        </form>
    </div>
);
}

export default Login;