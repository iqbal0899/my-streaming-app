import axiosApi from "./axiosApi";

// Semua request di bawah otomatis pakai baseURL dari VITE_API_BASE_URL

function toErrorMessage(err) {
  const backendMessage = err.response?.data?.message;
  return new Error(backendMessage || err.message || "Terjadi kesalahan, coba lagi.");
}

export async function getUsers() {
  try {
    const res = await axiosApi.get("/users");
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function getUserById(id) {
  try {
    const res = await axiosApi.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

// data: { nama, email, password, foto_profile }
export async function createUser(data) {
  try {
    const res = await axiosApi.post("/users", data);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function updateUser(id, data) {
  try {
    const res = await axiosApi.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function deleteUser(id) {
  try {
    const res = await axiosApi.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

// Login divalidasi di SERVER (password tidak pernah dikirim ke browser
// lewat getUsers()), lewat endpoint khusus POST /users/login.
export async function loginUser({ email, password }) {
  try {
    const res = await axiosApi.post("/users/login", { email, password });
    return res.data; // -> user (tanpa password)
  } catch (err) {
    throw toErrorMessage(err); // kalau salah, err.message berisi "Email atau password salah"
  }
}