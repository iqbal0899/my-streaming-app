import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

import "../css/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
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

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      await updateUser(editId, form);
    } else {
      await createUser(form);
    }

    setForm({
      email: "",
      password: "",
    });

    setEditId(null);

    loadUsers();
  }

  function handleEdit(user) {
    setEditId(user.id);

    setForm({
      email: user.email,
      password: user.password,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus user?")) return;

    await deleteUser(id);

    loadUsers();
  }

  return (
    <div className="container">

      <h2>CRUD Users</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button>
          {editId ? "Update" : "Tambah"}
        </button>

      </form>

      <table>

        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Password</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr key={user.id}>

              <td>{index + 1}</td>

              <td>{user.email}</td>

              <td>{user.password}</td>

              <td>

                <button
                  className="edit"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                >
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