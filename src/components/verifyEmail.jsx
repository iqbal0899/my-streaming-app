import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/api/userApi";
import "../css/verify-email.css";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("Memverifikasi email...");
    const [error, setError] = useState("");

    const hasVerified = useRef(false);

    useEffect(() => {

        if (hasVerified.current) {
            return;
        }

        if (!token) {
            setError("Token tidak ditemukan");
            return;
        }

        hasVerified.current = true;

        const handleVerify = async () => {
            try {
                console.log("TOKEN FRONTEND:", token);

                const result = await verifyEmail(token);

                console.log("HASIL VERIFY:", result);

                setMessage(result.message);

            } catch (err) {
                console.error("VERIFY ERROR:", err);

                setError(
                    err.message || "Token tidak valid"
                );
            }
        };

        handleVerify();

    }, [token]);

    return (
        <div className="verify-email">
            <div className="verify-email-card">

                <h2>Verifikasi Email</h2>

                {!error && (
                    <p className="verify-success">
                        ✓ {message}
                    </p>
                )}

                {error && (
                    <p className="verify-error">
                        ✕ {error}
                    </p>
                )}

                <button
                    className="verify-email-button"
                    onClick={() => navigate("/")}
                >
                    Kembali ke Login
                </button>

            </div>
        </div>
    );
}

export default VerifyEmail;