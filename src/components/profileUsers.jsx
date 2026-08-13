import { useState, useRef, useEffect } from "react";
import { Pencil, Camera, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, uploadProfilePhoto } from "../services/api/userApi";
import { loginSuccess } from "../store/authSlice";
import "../css/profileUsers.css";
import Ted from "../assets/ted.png";
import Bola from "../assets/bola.png";
import Hero from "../assets/academia.png";
import Dead from "../assets/dead.png";
import Duty from "../assets/duty.png";
import Big from "../assets/baymax.png";

const shows = [
  { id: 1, title: "All of Us are Dead", badge: "Episode Baru", image: Dead },
  { id: 2, title: "Baymax!", badge: "Episode Baru", image: Big },
  { id: 3, title: "My Hero Academia", badge: "Episode Baru", image: Hero },
  { id: 4, title: "Blue Lock", badge: "Episode Baru", image: Bola },
  { id: 5, title: "Ted Lasso", badge: "Episode Baru", corner: "30", image: Ted },
  { id: 6, title: "Duty After School", badge: "Episode Baru", image: Duty },
];

export default function ProfilSaya({ subscription }) {
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ambil auth yang sedang login dari Redux, supaya bisa di-merge
  // saat foto baru selesai diupload (tanpa perlu logout-login ulang).
  const auth = useSelector((state) => state.auth.auth);

  function buildPhotoUrl(filename) {
    return `${import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "")}/uploads/${filename}`;
  }

  function handleSimpan(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function handlePricingClick() {
    navigate("/pricing");
  }

  async function handleAvatarPick(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB");
      return;
    }

    // Preview instan sambil menunggu upload selesai
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);

    setUploading(true);

    try {
      // uploadProfilePhoto sudah diimport dari services/api/userApi,
      // TIDAK perlu didefinisikan ulang di sini.
      const result = await uploadProfilePhoto(file);

      const photoUrl = buildPhotoUrl(result.foto_profile);
      setAvatar(photoUrl);

      // PENTING: update Redux juga, supaya ProfileDropdown (dan komponen
      // lain yang membaca `auth`) langsung dapat foto terbaru tanpa
      // harus logout-login ulang.
      dispatch(
        loginSuccess({
          ...auth,
          foto_profile: result.foto_profile,
        })
      );
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal mengupload foto profil");
      // Upload gagal -> batalkan preview
      setAvatar(auth?.foto_profile ? buildPhotoUrl(auth.foto_profile) : null);
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getMyProfile();

        setNama(user.nama || "");
        setEmail(user.email || "");

        if (user.foto_profile) {
          setAvatar(buildPhotoUrl(user.foto_profile));
        }
      } catch (err) {
        console.error("Gagal mengambil profile:", err);
      }
    }

    loadProfile();
  }, []);

  return (
    <div className="ps-page">
      <h1 className="ps-heading">Profil Saya</h1>

      <div className="ps-top-grid">
        <section className="ps-card">
          <div className="ps-avatar-row">
            <div className="ps-avatar-wrap">
              {avatar ? (
                <img src={avatar} alt="Foto profil" className="ps-avatar-img" />
              ) : (
                <div className="ps-avatar-fallback">
                  <Camera size={22} color="#6b6f7d" />
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                className="ps-upload-btn"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Mengupload..." : "Ubah Foto"}
              </button>
              <p className="ps-upload-hint">Maksimal 2MB</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarPick}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <form onSubmit={handleSimpan}>
            <Field label="Nama Pengguna" value={nama ?? ""} onChange={setNama} />
            <Field label="Email" value={email ?? ""} onChange={setEmail} type="email" />

            <button type="submit" className="ps-save-btn">
              {saved ? (
                <span className="ps-saved-row">
                  <Check size={16} /> Tersimpan
                </span>
              ) : (
                "Simpan"
              )}
            </button>
          </form>
        </section>

        <aside className="ps-promo">
          <div className="ps-promo-icon">&#9733;</div>
          {subscription?.name ? (
            <>
              <p className="ps-promo-title">Anda berlangganan paket {subscription.name}</p>
              <p className="ps-promo-body">
                Nikmati akses tak terbatas ke ribuan film dan series favorit Anda.
              </p>
            </>
          ) : (
            <>
              <p className="ps-promo-title">Saat ini Anda belum berlangganan</p>
              <p className="ps-promo-body">
                Dapatkan akses tak terbatas ke ribuan film dan series favorit Anda.
              </p>
              <button type="button" className="ps-promo-cta" onClick={handlePricingClick}>
                Mulai Berlangganan
              </button>
            </>
          )}
        </aside>
      </div>

      <div className="ps-list-header">
        <h2 className="ps-list-title">Daftar Saya</h2>
        <button type="button" className="ps-see-all">Lihat Semua</button>
      </div>

      <div className="ps-rail">
        {shows.map((s) => (
          <div key={s.id} className="ps-poster">
            <div className="ps-poster-art">
              <img src={s.image} alt={s.title} className="ps-poster-image" />
              <span className="ps-ribbon">{s.badge}</span>
            </div>
            <p className="ps-poster-title">{s.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="ps-field-label">
      {label}
      <div className="ps-field-row">
        <input
          className="ps-input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Pencil size={15} color="#6b6f7d" className="ps-pencil" />
      </div>
    </label>
  );
}