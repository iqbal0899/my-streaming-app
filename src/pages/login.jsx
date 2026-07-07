import {useState} from 'react';
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'password') {
        alert('Login successful!');
    }else{
        alert('Email atau Password Salah');
    }
};

return(
    <div className="container">
    <form onSubmit={handleLogin} className="login-form">
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

            <span 
            className="punya-akun">Belum punya akun? 
            <a href="/register">Daftar</a> 
            <a href="/forgot-password">Lupa Password?</a>
            </span>

            <button type="submit">Login</button>


            <p className="atau">Atau</p>


            <button type="button" className="login-google">Login dengan Google</button>
        </form>
    </div>
);
}

export default Login;