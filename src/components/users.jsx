import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api/userApi";

import "../css/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  function validate() {
    if (!form.nama.trim()) {
      return "Nama tidak boleh kosong";
    }
    if (!form.email.includes("@")) {
      return "Email harus menggunakan karakter @";
    }
    if (!editId && form.password.length < 6) {
      return "Password minimal 6 karakter";
    }
    if (editId && form.password && form.password.length < 6) {
      return "Password minimal 6 karakter";
    }

    const emailExist = users.some(
      (user) => user.email === form.email && user.id_user !== editId
    );

    if (emailExist) {
      return "Email sudah terdaftar";
    }

    return "";
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validateError = validate();

    if (validateError) {
      setError(validateError);
      return;
    }

    setError("");

    if (editId) {
      await updateUser(editId, form);
    } else {
      await createUser(form);
    }

    setForm({ nama: "", email: "", password: "" });
    setEditId(null);

    loadUsers();
  }

  function handleEdit(user) {
    setEditId(user.id_user);

    setForm({
      nama: user.nama,
      email: user.email,
      password: "", // password tidak pernah dikirim balik dari server (aman)
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus user?")) return;

    await deleteUser(id);

    loadUsers();
  }

  return (
    <div className="container-users">
      <h2>Daftar Users</h2>

      <form onSubmit={handleSubmit} className="form-users">
        <input
          className="users-input-name"
          name="nama"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={handleChange}
        />

        <input
          className="users-input-email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="users-input-password"
          name="password"
          type="password"
          placeholder={editId ? "Password baru (kosongkan jika tidak diubah)" : "Password"}
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn-btn">{editId ? "Update" : "Tambah"}</button>

        {error && <p className="error">{error}</p>}
      </form>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Password</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id_user}>
              <td>{index + 1}</td>
              <td>{user.nama}</td>
              <td>{user.email}</td>
              <td>Rahasia</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user)}>
                  Edit
                </button>

                <button className="delete" onClick={() => handleDelete(user.id_user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}