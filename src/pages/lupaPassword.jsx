import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api/userApi";
import "../css/lupa-password.css";

function LupaPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Email wajib diisi");
            return;
        }

        try {
            setLoading(true);

            await forgotPassword(email.trim());

            setSuccess(
                "Link reset password berhasil dikirim ke Gmail kamu."
            );

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-page">

            <div className="forgot-container">

                <div className="forgot-header">
                    <h2>Lupa Password?</h2>

                    <p>
                        Masukkan email yang terdaftar.
                        Link reset password akan dikirim
                        ke email kamu.
                    </p>
                </div>

                <form
                    className="forgot-form"
                    onSubmit={handleForgotPassword}
                >

                    <div className="forgot-input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    {error && (
                        <p className="forgot-error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="forgot-success">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="forgot-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Mengirim..."
                            : "Reset Password"
                        }
                    </button>

                </form>

                <div className="forgot-footer">
                    <Link to="/login">
                        Kembali ke Login
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default LupaPassword;