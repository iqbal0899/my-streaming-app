import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import bg from "../assets/bg.jpg";
import Button from "../components/button";

function Login({onLoginSuccess}) {
  const [email, setUser] = useState('');
  const [password, setPassword] = useState('');
   const [submitting, setSubmitting] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const validate = () => {
    if (!email.includes("@")){
        return "Email Harus Pakai @";
    }

    if (password.length < 6){
        return "Password Min 6";
    }
    return "";

   };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const validasiError = validate();
    if(validasiError) {
        setError(validasiError);
        return;
    }

    setSubmitting(true);
    
    navigate("./home.jsx");

    //simulasi proses login
    setTimeout(() => {
        setSubmitting(false);

        if(onLoginSuccess) {
            onLoginSuccess({email, password});
        }
    }, 500)

};

return(
    <div className="container">
    <form onSubmit={handleLogin} className="login-form">
        <img src={Logo} alt="Logo" className="logo" />
            <h2>Masuk</h2>

            <h3>Username</h3>
            <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setUser(e.target.value)}
            />
            <h3>Kata Sandi</h3>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="akun">
                <span>Belum punya akun?
                <a href="#">Daftar</a>
                 </span>

                <a href="#" className="forgot-password">Lupa kata sandi?</a>
           </div>

            <div className='mb-3'>
            <Button type='submit' fullWidth disabled={submitting}>
              {submitting ? 'Logging in...' : 'Log in'}
            </Button>
          </div>


            <p className="atau">Atau</p>


            <button type="button" className="login-google"> <img src={google} alt="Google Logo"></img> Login dengan Google</button>
        </form>
    </div>
);
}

export default Login;