import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/reset-password.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [passwordBaru, setPasswordBaru] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (passwordBaru !== confirmPassword) {
            setError("Password tidak sama");
            return;
        }

        try {
            await axios.post("/api/v1/users/reset-password", {
                token,
                password: passwordBaru
            });

            setSuccess("Password berhasil diubah");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Gagal mengubah password"
            );
        }
    };

    

    return (
        <div className="reset-page">

            <div className="reset-container">

                <div className="reset-header">
                    <h2>Reset Password</h2>

                    <p>
                        Buat password baru untuk akun Chill kamu.
                    </p>
                </div>

                <form
                    className="reset-form"
                    onSubmit={handleResetPassword}
                >

                    <div className="reset-input-group">
                        <label>Password Baru</label>

                        <input
                            type="password"
                            placeholder="Masukkan password baru"
                            value={passwordBaru}
                            onChange={(e) =>
                                setPasswordBaru(e.target.value)
                            }
                        />
                    </div>

                    <div className="reset-input-group">
                        <label>Konfirmasi Password</label>

                        <input
                            type="password"
                            placeholder="Konfirmasi password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <p className="reset-error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="reset-success">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="reset-button"
                    >
                        Reset Password
                    </button>

                </form>

                <div className="reset-footer">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Kembali ke Login
                    </button>
                </div>

            </div>

        </div>
    );
}

export default ResetPassword;