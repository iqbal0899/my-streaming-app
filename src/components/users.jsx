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

  function validate() {
    if(!form.email.includes("@")) {
      return "Email harus menggunakan karakter @";
    }

    if (form.password.length < 6) {
      return "Password minimal 6 karakter";
    }

    const emailExist = users.some(
      (user) =>
        user.email === form.email &&
        user.id !== editId
    );

    if(emailExist){
      return "Email sudah terdaftar";
    }

    return;
  }

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

  console.log("Data dari API:", data);
  console.log("Apakah array?", Array.isArray(data));

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

    const validateError = validate();

    if(validateError) {
      setError(validateError);
      return;
    }

    setError("");

    if(editId) {
      await updateUser (editId, form);
    }else{
      await createUser (form);
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
    <div className="container-users">

      <h2>Daftar Users</h2>

      <form onSubmit={handleSubmit}>

        Email: <input
          className="users-input-email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        Password: <input
          className="users-input-password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn-btn">
          {editId ? "Update" : "Tambah"}
        </button>

        {error && <p className="error">{error}</p>}
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

        <tbody className="users-table-body">

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